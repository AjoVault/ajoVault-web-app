import DashLoginProfile from "./DashLoginProfile";
import ContributionSavingsCard from "./ContributionSavingsCard";

const Withdrawal = () => {
    return (
        <section className="flex flex-col pr-4 pt-10 pb-4 lg:w-[90%] lg:mx-auto">
            <div className="flex gap-3 justify-end items-center">
                <DashLoginProfile />
            </div>

            <h1 className="text-[40px] text-nowrap font-semibold py-4">
                Withdrawal
            </h1>
            <section>
                <ContributionSavingsCard />
            </section>
            <section className="pt-10 flex gap-4 justify-between">
                <div className="pr-5 flex flex-col gap-6 pt-10 pb-24">
                    <h3 className="w-[24rem]">
                        Please note, to withdraw abruptly from an already joined
                        pool, you will pay all outstanding contribution and a 2%
                        penalty charge
                    </h3>
                    <button className="bg-[#9D8EFB] text-white rounded-lg py-3 mt-5 w-[300px] md:w-full">
                        Withdraw
                    </button>
                </div>
                <div className="border-r-2 border-[#B5AAFC]"></div>
                <div className="flex flex-col gap-6 pt-10 pb-24">
                    <h3 className="w-[25rem]">
                        Please note, to withdraw abruptly from personal savings,
                        you will have to unlock the funds with a 2% penalty
                        charge
                    </h3>
                    <button className="bg-[#9D8EFB] text-white rounded-lg py-3 w-[300px] md:w-full mt-5">
                        Unlock
                    </button>
                </div>
            </section>
        </section>
    );
};

export default Withdrawal;
