import React from "react";
import { useParams } from "react-router-dom";
import BranchesLayout from "./BranchesLayout";
import Navbar from "../Navbar";
import Footer from '../Footer'
import { branchesData } from "./branchData";


const Branch = () => {
  const { branchName } = useParams();
  const members = branchesData[branchName];

  if (!members) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center text-red-600 font-bold">
          Branch "{branchName}" not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">
          {branchName} Branch Members
        </h1>
        <div className="flex flex-wrap justify-center">
          {members.map((member, idx) => (
            <BranchesLayout key={idx} {...member} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Branch;
