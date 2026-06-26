"use client";

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import Search from "./Search";
import { site } from "../data/site";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-transparent" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden lg:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <TransitionChild
                as={Fragment}
                enter="transform transition duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-[85vw] max-w-80 bg-[#FAF8F3] shadow-2xl">
                  <div className="flex h-full flex-col p-6">
                    <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">
                        {site.name}
                      </h2>

                      <button
                        onClick={onClose}
                        className="text-3xl leading-none"
                      >
                        ×
                      </button>
                    </div>

                    <Search />

                    <nav className="mt-8">
                      <ul className="space-y-5">
                        {site.navigation.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/category/${item.toLowerCase()}`}
                              onClick={onClose}
                              className="text-lg font-medium hover:text-neutral-500"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}