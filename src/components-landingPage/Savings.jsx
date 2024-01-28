import DashLoginProfile from "./DashLoginProfile";
const Savings = () => {
    return (
        <section className="flex flex-col pr-4 pt-10 pb-4 lg:w-[90%] lg:mx-auto">
            <div className="flex gap-3 justify-end items-center">
                <DashLoginProfile />
            </div>

            <h1 className="text-[40px]">Saving Plans</h1>
        </section>
    );
};

export default Savings;
