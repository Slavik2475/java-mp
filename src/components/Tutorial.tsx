import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Code2, Copy, Check } from 'lucide-react';

const tutorials = {
  1: {
    title: 'Multithreading in Java',
    content: `Multithreading is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. Each part of such program is called a thread. So, threads are light-weight processes within a process.

    Threads can be created by using two mechanisms : 
    
    1.Extending the Thread class 
    2.Implementing the Runnable Interface
    
Thread creation by extending the Thread class
We create a class that extends the java.lang.Thread class. This class overrides the run() method available in the Thread class. A thread begins its life inside run() method. We create an object of our new class and call start() method to start the execution of a thread. Start() invokes the run() method on the Thread object
    
    `,
    example: `public class Multithread {
      public static void main(String[] args) {
          int n = 8; // Number of threads
  
          for (int i = 0; i < n; i++) {
              // Creating a thread using an anonymous class
              Thread thread = new Thread(() -> {
                  try {
                      // Displaying the thread that is running
                      System.out.println(
                          "Thread " + Thread.currentThread().getId()
                          + " is running");
                  } catch (Exception e) {
                      // Throwing an exception
                      System.out.println("Exception is caught");
                  }
              });
  
              // Starting the thread
              thread.start();
          }
      }
  }`,
  },
  2: {
    title: 'Synchronization in Java',
    content: `Multi-threaded programs may often come to a situation where multiple threads try to access the same resources and finally produce erroneous and unforeseen results. 

Why use Java Synchronization?
Java Synchronization is used to make sure by some synchronization method that only one thread can access the resource at a given point in time. 
    
Java Synchronized Blocks
Java provides a way of creating threads and synchronizing their tasks using synchronized blocks. 
    
A synchronized block in Java is synchronized on some object. All synchronized blocks synchronize on the same object and can only have one thread executed inside them at a time. All other threads attempting to enter the synchronized block are blocked until the thread inside the synchronized block exits the block. If you want to master concurrency and understand how to avoid common pitfalls, the Java Programming Course offers in-depth coverage of synchronization with practical coding exercises.
    `,
    example: `public class SyncDemo {
      public static void main(String[] args) {
          // Shared sender object
          Object sender = new Object();
  
          // Create thread 1
          Thread t1 = new Thread(() -> {
              synchronized (sender) {
                  System.out.println("Sending\tHi");
                  try {
                      Thread.sleep(1000);
                  } catch (InterruptedException e) {
                      System.out.println("Thread interrupted.");
                  }
                  System.out.println("\nHi Sent");
              }
          });
  
          // Create thread 2
          Thread t2 = new Thread(() -> {
              synchronized (sender) {
                  System.out.println("Sending\tBye");
                  try {
                      Thread.sleep(1000);
                  } catch (InterruptedException e) {
                      System.out.println("Thread interrupted.");
                  }
                  System.out.println("\nBye Sent");
              }
          });
  
          // Start the threads
          t1.start();
          t2.start();
  
          // Wait for threads to finish
          try {
              t1.join();
              t2.join();
          } catch (InterruptedException e) {
              System.out.println("Interrupted");
          }
      }
  }`,
  },
  3: {
    title: 'Asynchronous Programming in Java',
    content: `Asynchronous programming in Java allows you to execute the tasks concurrently improving the overall performance and responsiveness of your applications. Java provides several mechanisms for asynchronous programming and two commonly used approaches are discussed in this article.

Approaches for Asynchronous Programming
There are two commonly used approaches for Asynchronous Programming as mentioned below:
    
Callbacks with CompletableFuture
Asynchronous Programming with Future and ExecutorService
1. Callbacks with CompletableFuture
The CompletableFuture is a class introduced in Java 8 that facilitates asynchronous programming using the callback-based approach.
It represents a promise that may be asynchronously completed with the value or an exception.
Example of demonstrating the use of the CompletableFuture:`,
    example: `//Java program to demonstrate the use of the CompletableFuture 
    import java.io.*; 
    import java.util.concurrent.CompletableFuture; 
      
    public class GFG { 
      
        public static void main(String[] args) { 
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> { 
                try { 
                    Thread.sleep(200); 
                } catch (InterruptedException e) { 
                    e.printStackTrace(); 
                } 
                return "Hello, CompletableFuture!"; 
            }); 
            future.thenAccept(result -> System.out.println("The Result: " + result)); 
            try { 
                Thread.sleep(300); 
            } catch (InterruptedException e) { 
                e.printStackTrace(); 
            } 
        } 
    } 
    
    `,
  },
};

const Tutorial = () => {
  const { id } = useParams();
  const tutorial = tutorials[Number(id)];
  const [copied, setCopied] = useState(false);

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  const copyCode = () => {
    navigator.clipboard.writeText(tutorial.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {tutorial.title}
      </h1>

      <div className="prose max-w-none mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Study Content
          </h2>
          <div className="whitespace-pre-wrap text-gray-700">
            {tutorial.content}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Example Code
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyCode}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Code
                  </>
                )}
              </button>
              <Link
                to="/editor"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Try it yourself
              </Link>
            </div>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{tutorial.example}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
