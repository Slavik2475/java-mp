import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Code2, Copy, Check } from 'lucide-react';

const tutorials = {
  1: {
    title: 'Introduction to Java',
    content: `Java is a popular programming language that follows the Object-Oriented programming paradigm. It was developed by Sun Microsystems and released in 1995.

Key features of Java include:
- Platform independence (Write Once, Run Anywhere)
- Object-oriented programming
- Rich standard library
- Automatic memory management`,
    example: `public class HelloWorld {
    public static void main(String[] args) {
        // This is a comment
        System.out.println("Hello, World!");
        
        // Variables
        String name = "JavaLab";
        int age = 28;
        
        // String concatenation
        System.out.println("Welcome to " + name);
        System.out.println("Java is " + age + " years old");
    }
}`,
  },
  2: {
    title: 'Control Structures',
    content: `Control structures in Java allow you to control the flow of your program's execution. The main control structures are:

1. If-else statements
2. Loops (for, while, do-while)
3. Switch statements`,
    example: `public class ControlStructures {
    public static void main(String[] args) {
        // If-else statement
        int number = 10;
        
        if (number > 0) {
            System.out.println("Positive number");
        } else if (number < 0) {
            System.out.println("Negative number");
        } else {
            System.out.println("Zero");
        }
        
        // For loop
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // While loop
        int count = 0;
        while (count < 3) {
            System.out.println("While loop: " + count);
            count++;
        }
    }
}`,
  },
  3: {
    title: 'Object-Oriented Programming',
    content: `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects that contain data and code. The main principles of OOP are:

1. Encapsulation
2. Inheritance
3. Polymorphism
4. Abstraction`,
    example: `class Animal {
    private String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal dog = new Dog("Buddy");
        dog.makeSound(); // Outputs: Woof!
    }
}`,
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
