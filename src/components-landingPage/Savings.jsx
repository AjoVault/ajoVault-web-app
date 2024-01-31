import DashLoginProfile from "./DashLoginProfile";
import ContributionSavingsCard from "./ContributionSavingsCard";
import editIcon from "../assets/edit.svg";
const Savings = () => {
    return (
        <section className="flex flex-col pr-4 pt-10 pb-4 lg:w-[90%] lg:mx-auto">
            <div className="flex gap-3 justify-end items-center">
                <DashLoginProfile />
            </div>

            <h1 className="text-[40px] text-nowrap font-semibold py-4">
                Saving Plans
            </h1>
            <section>
                <ContributionSavingsCard />
            </section>
            <h1 className="text-[33px] font-semibold py-10">Details</h1>
            <section className="flex gap-4">
                <div className="flex gap-8 border-r-2 border-[#B5AAFC] pr-5">
                    <div className="flex flex-col gap-4 text-nowrap">
                        <h3 className="font-poppins text-[19px]">
                            Pool start Date:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Pool Amount:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Your Pool Position:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Total Number of pool members:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Pool Frequency:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Pool Target:
                        </h3>
                        <h3 className="font-poppins text-[19px]">
                            Withdrawal Date:
                        </h3>
                        <button className="bg-[#9D8EFB] text-white rounded-lg py-3 w-[200px] mt-5">
                            Join New Pool
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 text-nowrap">
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            12/02/2024
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            NGN 100,000
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            5th
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            20
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            Monthly
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            NGN 2,000,000
                        </h3>
                        <h3 className="font-poppins text-[19px] text-[#808080]">
                            12/12/2024
                        </h3>
                        <button className="bg-[#9D8EFB] text-white rounded-lg py-3 mt-5">
                            Create Pool
                        </button>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-9">
                        <h3 className="text-[#808080] text-[19px] text-nowrap font-poppins pb-4">
                            Personal savings can only be increased
                        </h3>
                        <img
                            src={editIcon}
                            alt="edit icon"
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 text-nowrap">
                            <h3 className="font-poppins text-[19px]">
                                Savings start Date:
                            </h3>
                            <h3 className="font-poppins text-[19px]">
                                Savings Amount:
                            </h3>
                            <h3 className="font-poppins text-[19px]">
                                Savings Duration:
                            </h3>
                            <h3 className="font-poppins text-[19px]">
                                Savings Frequency:
                            </h3>
                            <h3 className="font-poppins text-[19px]">
                                Savings Target:
                            </h3>
                            <h3 className="font-poppins text-[19px]">
                                Savings Target:
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4 text-nowrap">
                            <h3 className="font-poppins text-[19px] text-[#808080]">
                                12/03/2024
                            </h3>
                            <h3 className="text-[#5A47CF] font-poppins text-[19px]">
                                NGN 50,000
                            </h3>
                            <h3 className="text-[#5A47CF] font-poppins text-[19px]">
                                12 Months
                            </h3>
                            <h3 className="text-[#5A47CF] font-poppins text-[19px]">
                                Monthly
                            </h3>
                            <h3 className="text-[#5A47CF] font-poppins text-[19px]">
                                NGN 1,000,000
                            </h3>
                            <h3 className="text-[#5A47CF] font-poppins text-[19px]">
                                12/12/2024
                            </h3>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#9D8EFB] text-white rounded-lg py-3 mt-6 w-[200px]">
                            Start New plan
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Savings;
