"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNotificationStore } from "@/lib/store";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const readOptions = [{ title: "Read" }, { title: "Unread" }];

export default function Example({
  initialStatus,
  uid,
}: {
  initialStatus: boolean;
  uid: number;
}) {
  const [status, setStatus] = useState(initialStatus);
  const updateStatus = useNotificationStore((state) => state.updateStatus);
  const [marking, setMarking] = useState(false);

  const handleChange = async (value: boolean) => {
    await setMarking(true);
    setTimeout(() => {
      setStatus(value);
      updateStatus(uid);
      setMarking(false);
    }, 1000);
  };

  return (
    <Listbox value={status} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change published status
          </Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm">
                {marking ? (
                  ""
                ) : status ? (
                  <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                ) : null}
                <p className="text-sm font-semibold">
                  {marking ? "Marking.." : status ? "Read" : "Unread"}
                </p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {readOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option.title === "Read" ? true : false}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-indigo-600"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
