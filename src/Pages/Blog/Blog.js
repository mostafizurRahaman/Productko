import React from "react";
import useTitle from "../../hooks/useTitle";

const Blog = () => {
   useTitle('Blog'); 
   return (
      <div className="px-20 ">
         <h2 className="text-2xl  mt-5 p-3 rounded  font-bold capitalize  bg-accent text-secondary ">
            What are the different ways to manage a state in a React
            application?
         </h2>
         <div>
            <ul className="text-xl font-bold list-disc pb-3   pl-5">
               <li>Local state</li>
               <li>Global state</li>
               <li>Server state</li>
               <li>URL state</li>
            </ul>
         </div>
         <div>
            <h2 className="text-2xl  my-5 p-3 rounded  font-bold capitalize  bg-accent text-secondary ">
               {" "}
               How does prototypical inheritance work?
            </h2>
            <p className="text-xl">
               JavaScript inheritance is more widely known as “prototypal
               inheritance.” Prototypal inheritance uses the concept of
               prototype chaining, and it refers to the linking of objects via
               the prototype property. When a constructor function creates an
               object, it does not create it based on the constructor’s
               prototype; instead, it creates an object linked to the
               constructor’s prototype object.
            </p>
         </div>
         <div className="my-5 ">
            <h2 className="text-2xl  my-5 p-3 rounded  font-bold capitalize  bg-accent text-secondary ">
               What is a unit test? Why should we write unit tests?
            </h2>
            <p className="text-xl py-3">
               Unit testing is an important step in the development process,
               because if done correctly, it can help detect early flaws in code
               which may be more difficult to find in later testing stages.
            </p>
            <p className="text-xl py-3">
               When should you write unit tests? For Test-Driven Development
               (TDD), you write unit tests before writing any implementation.
               This makes your implementation details in your code shorter and
               easier to understand. In this instance, the best time to write
               unit tests is immediately. For others, most developers write unit
               tests after the code's been written.
            </p>
         </div>
         <div>
         <h2 className="text-2xl  my-5 p-3 rounded  font-bold capitalize  bg-accent text-secondary ">
         React vs. Angular vs. Vue?
            </h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>topics</th>
        <th>React</th>
        <th>Angular </th>
        <th>Vue</th>
      </tr>
    </thead>
    <tbody>
  
      <tr>
        <th>Launch Year</th>
        <td>2013</td>
        <td>2010</td>
        <td>2014</td>
      </tr>
   
      <tr className="hover">
        <th>Written In </th>
        <td>TypeScript</td>
        <td>Javascript </td>
        <td>Javascript</td>
      </tr>
      <tr>
        <th>Entity ThereSold</th>
        <td>high </td>
        <td>average </td>
        <td>low</td>
      </tr>
      <tr>
        <th>project Size</th>
        <td>very Complex  </td>
        <td>Complex </td>
        <td>smaller</td>
      </tr>
    </tbody>
  </table>
</div>
         
         </div>
      </div>
   );
};

export default Blog;
