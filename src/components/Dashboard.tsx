import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Terminal } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Multithreading in Java',
    description: 'Learn the basics of Multithreading in Java',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Control Structures',
    description: 'Master if statements, loops, and switch cases',
    icon: Terminal,
  },
  {
    id: 3,
    title: 'Object-Oriented Programming',
    description: 'Understand classes, objects, inheritance, and polymorphism',
    icon: Code2,
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to JavaLab</h1>
        <p className="text-lg text-gray-600 mb-8">Start your journey in Java programming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => {
          const Icon = tutorial.icon;
          return (
            <Link
              key={tutorial.id}
              to={`/tutorial/${tutorial.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
              <p className="text-gray-600">{tutorial.description}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/editor"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Code2 className="h-5 w-5 mr-2" />
          Open Code Editor
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;