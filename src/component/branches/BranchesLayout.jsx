import React from "react";

const BranchesLayout = ({ image, name, post }) => {
  return (
    <div className="w-full md:w-1/3 px-2 py-4">
      <div className="rounded-lg overflow-hidden shadow-md h-full flex flex-col group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />
        </div>

        <div className="p-4 flex-grow bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Member Name: {name}</h3>
          <p className="text-gray-500 text-sm mt-1">Post: {post}</p>
        </div>
      </div>
    </div>
  );
};

export default BranchesLayout;
