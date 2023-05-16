import { useForm } from "react-hook-form";
import Head from "next/head";
import { db } from "@/utils/db";

export default function CharacterCreation({ uid, setCharacter, supabase }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await db.create(uid, data, supabase).then((e) => {
      setCharacter(e);
    });
  };

  const classDescriptions = {
    Mage: "The Mage class specializes in casting spells and manipulating elements to defeat enemies.",
    Warrior:
      "The Warrior class specializes in melee combat and can withstand more damage than other classes.",
    Archer:
      "The Archer class specializes in ranged combat and can deal damage from a distance.",
  };

  const classImages = {
    Mage: "/sprites/mage.png",
    Warrior: "/sprites/warrior.png",
    Archer: "/sprites/archer.png",
  };

  return (
    <>
      <>
        <Head>
          <title>Introduction - LifeQuester</title>
        </Head>
        <div className="max-w-[85vw] m-auto px-4 py-8 border border-gray-300 shadow-sm rounded-md">
          <div className="max-w-[80vw] m-auto px-4 py-8 ">
            <p className="mt-2 ">Create your character:</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md${
                    errors.name ? " border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">Name is required</p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="characterClass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class
                </label>
                <select
                  {...register("characterClass", { required: true })}
                  id="characterClass"
                  name="characterClass"
                  autoComplete="off"
                  className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md${
                    errors.characterClass ? " border-red-500" : ""
                  }`}
                >
                  <option value="">-- Select a class --</option>
                  <option value="Mage">Mage</option>
                  <option value="Warrior">Warrior</option>
                  <option value="Archer">Archer</option>
                </select>
                {errors.characterClass && (
                  <p className="mt-1 text-sm text-red-500">Class is required</p>
                )}
                {watch("characterClass") && (
                  <img
                    src={classImages[watch("characterClass")]}
                    alt={watch("characterClass")}
                    className="w-24 h-24 animate-bounce-short my-2"
                  />
                )}
                <p className="my-2 text-sm">
                  {classDescriptions[watch("characterClass")]}
                </p>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create Character
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
