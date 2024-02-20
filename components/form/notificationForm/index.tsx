"use client";
import { useNotificationStore } from "@/lib/store";
import React, { useEffect, useState } from "react";

let counter = 0;

const NotificationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isSuccess = await simulateBackendCallWithRandomResult();
    if (isSuccess) {
      addNotification({ uid: counter, name, description, read: false });
      setName("");
      setDescription("");
      counter++;
      setLoading(false);
    } else {
      alert("Failed to add notification");
    }
  };

  function simulateBackendCallWithRandomResult(
    data?: any,
    time: number = 1000
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        isSuccess ? resolve(true) : resolve(false);
      }, time);
    });
  }

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg relative"
          disabled={loading}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
            </div>
          )}
          Add Notification
        </button>
      </form>
    </>
  );
};

export default NotificationForm;
