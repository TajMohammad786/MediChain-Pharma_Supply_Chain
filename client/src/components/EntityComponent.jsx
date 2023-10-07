import { Link } from "react-router-dom";

const EntityComponent = ({ name, image }) => {
  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3">
      <div className="relative flex">
        <img
          alt="gallery"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={image}
        />
        <div className="relative z-10 flex w-full items-center justify-center border-4 border-gray-200 bg-white px-8 py-10 opacity-0 hover:opacity-100 ">
          <Link
            className="title-font mb-3 cursor-pointer font-head text-lg font-semibold capitalize text-gray-900"
            to={`/${name}/dashboard`}
          >
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntityComponent;
