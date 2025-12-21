import { User, Heart } from "lucide-react";

const UserMenu: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-full bg-gray-100 p-2">
        <User size={20} />
      </button>
      <button className="rounded-full bg-gray-100 p-2">
        <Heart size={20} />
      </button>
    </div>
  );
};

export default UserMenu;
