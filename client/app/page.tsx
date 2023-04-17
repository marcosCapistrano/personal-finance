import Container from "@/app/components/Container";
import Link from "next/link";

export default function Home() {
  return (
        <div className="py-20 max-w-3xl mx-auto text-center">
          <h1 className="text-7xl pb-7 font-bold">
            Take control of your finances with ease
          </h1>
          <p className="text-xl pb-12">
            Manage your money like a pro and achieve your financial goals with
            our easy-to-use app.
          </p>

          <Link
            href="/auth"
            className="bg-[#fc4c69] p-4 text-white font-semibold rounded-md"
          >
            TAKE BACK CONTROL
          </Link>
        </div>
  );
}
