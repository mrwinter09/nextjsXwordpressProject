import { ButtonLink } from "components/ButtonLink";
import Link from "next/link";
import { FaHeart, FaHouseUser } from "react-icons/fa";

export default function MainMenu({ items, label, destination }) {
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
      <div className="py-6 pl-5 flex text-pink-600">
        <FaHouseUser size={30} />
        <FaHeart size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-slate-700 cursor-pointer relative group"
          >
            <div>
              <Link className="p-5 block" href={item.destination}>
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.id}
                    href={subMenuItem.destination}
                    className="block whitespace-nowrap p-5 hover:bg-slate-700"
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <ButtonLink label={label} destination={destination} />
        </div>
      </div>
    </div>
  );
}
