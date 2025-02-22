import { ChevronsUpDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { User } from "./SidebarLayout";

export default function Modal(props: {
  userId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [friends, setFriends] = useState<User[]>();

  useEffect(() => {
    if (props.isOpen) {
      ref.current?.showModal();
    }

    fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/users/${props.userId}/friends`,
    )
      .then((res) => res.json())
      .then((data) => setFriends(data.friends))
      .catch((err) => console.error(err.message));
  }, [props.isOpen]);

  return (
    <div className="relative">
      <dialog
        ref={ref}
        id="modal"
        className="w-lg p-4 absolute top-1/2 left-1/2 -translate-1/2 backdrop:bg-slate-950/40 rounded-md outline-1 outline-blue-200"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Send a message</h3>
          <button
            onClick={() => {
              ref.current?.close();
              props.setIsOpen(false);
            }}
            className="p-2 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <X className="size-4 text-blue-700" />
          </button>
        </div>
        <p className="mt-1">
          Choose a user from the list below, to send a message
        </p>
        <form className="mt-3">
          <div className="relative  text-gray-900 flex items-center w-52 rounded-md outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
            <select
              name="user"
              id="user"
              className="appearance-none focus:outline-none w-full px-2 py-1"
              defaultValue={friends && friends[0].name}
            >
              {friends &&
                friends.map((friend) => (
                  <option key={friend.id} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
            </select>
            <ChevronsUpDown className="size-4 absolute  top-1/2 right-2 -translate-y-1/2" />
          </div>
          <button className="mt-2 py-1.5 px-3 bg-blue-700 hover:bg-blue-500 transition-colors cursor-pointer rounded-md text-white font-semibold">
            Send
          </button>
        </form>
      </dialog>
    </div>
  );
}
