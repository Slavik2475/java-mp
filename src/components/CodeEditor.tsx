import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Save } from 'lucide-react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import SaveCodeModal from './SaveCodeModal';
import SavedCodesList from './SavedCodesList';

const defaultCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

interface SavedCode {
  id: string;
  title: string;
  code: string;
  createdAt: Date;
}

export default function Component() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadSavedCodes().catch((err) => {
          console.error('Error in initial load:', err);
          setError('Failed to load saved codes. Please refresh the page.');
        });
      } else {
        setSavedCodes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadSavedCodes = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, 'savedCodes'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const codes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as SavedCode[];

      setSavedCodes(codes);
      setError(null);
    } catch (err: any) {
      console.error('Error loading codes:', err);
      setError('Failed to load saved codes. Please try again.');
      throw err;
    }
  };

  const compileAndRunCode = async (code: string) => {
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [
            {
              content: code,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Compilation request failed');
      }

      const result = await response.json();

      if (result.run.output) {
        return result.run.output;
      } else if (result.run.stderr) {
        return `Error: ${result.run.stderr}`;
      } else {
        return 'Program executed successfully with no output.';
      }
    } catch (err) {
      console.error('Error executing code:', err);
      throw new Error('Failed to execute code. Please try again.');
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setError(null);
    setOutput('Compiling and running code...');

    try {
      const result = await compileAndRunCode(code);
      setOutput(result);
    } catch (err: any) {
      setOutput(err.message || 'An unexpected error occurred');
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCode = async (title: string) => {
    if (!auth.currentUser) {
      setError('Please sign in to save code');
      return;
    }

    try {
      await addDoc(collection(db, 'savedCodes'), {
        userId: auth.currentUser.uid,
        title,
        code,
        createdAt: serverTimestamp(),
      });

      setIsSaveModalOpen(false);
      await loadSavedCodes();
      setError(null);
    } catch (err) {
      console.error('Error saving code:', err);
      setError('Failed to save code. Please try again.');
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'savedCodes', id));
      await loadSavedCodes();
      setError(null);
    } catch (err) {
      console.error('Error deleting code:', err);
      setError('Failed to delete code. Please try again.');
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex">
        <div className="flex-1 border-r border-gray-200">
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <h2 className="text-lg font-semibold text-gray-700">Java Editor</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSaveModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleRunCode}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                <span>{isLoading ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>
          <Editor
            height="calc(100vh - 3rem)"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              automaticLayout: true,
            }}
          />
        </div>
        <div className="w-1/3">
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
            <h2 className="text-lg font-semibold text-gray-700">Output</h2>
          </div>
          <div className="p-4 font-mono text-sm whitespace-pre-wrap h-[calc(100vh-3rem)] overflow-auto bg-gray-900 text-gray-100">
            {output || 'Run your code to see the output here...'}
          </div>
        </div>
        <SavedCodesList
          codes={savedCodes}
          onLoad={setCode}
          onDelete={handleDeleteCode}
        />
      </div>
      <SaveCodeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveCode}
      />
    </div>
  );
}
