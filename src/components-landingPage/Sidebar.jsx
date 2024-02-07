import {Fragment} from "react";
import coin from "../assets/coin.svg";
import homeIcon from "../assets/homeIcon.svg";
import homeIcon2 from "../assets/homeIcon2.svg";
import savingsIcon from "../assets/savingsIcon.svg";
import savingsIcon2 from "../assets/savingsIcon2.svg";
import outbox from "../assets/outbox.svg";
import outbox2 from "../assets/outbox2.svg";
import contract from "../assets/contract.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import settingsIcon2 from "../assets/settingsIcon2.svg";
import support from "../assets/support.svg";

import DashHome from "./DashHome";
import Savings from "./Savings";
import Withdrawal from "./Withdrawal";
import {Tab} from "@headlessui/react";
import {TransactionPage} from "../pages/TransactionPage/TransactionPage";

const Sidebar = () => {
	return (
		<section className="bg-[#FCFCFC]">
			<Tab.Group>
				<div className="flex gap-4 h-screen rounded-sm">
					<Tab.List className="flex flex-col justify-between bg-[#5A47CF] py-10 md:w-[200px] lg:w-[250px] shrink-0">
						<div className="flex flex-col items-center text-white">
							<div className="flex items-center gap-1 pb-8 cursor-pointer">
								<img src={coin} alt="ajo vault logo" />
								<p className="font-semibold text-3xl hidden md:block">
									Ajo<span className="text-[#5E0035]">V</span>
									ault
								</p>
							</div>
							<Tab as={Fragment}>
								{({selected}) => (
									<div
										className={`w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? homeIcon : homeIcon2}
											alt="home icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Home
										</p>
									</div>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({selected}) => (
									<div
										className={`text-center w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? savingsIcon2 : savingsIcon}
											alt="Savings icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Savings
										</p>
									</div>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({selected}) => (
									<div
										className={` w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? outbox2 : outbox}
											alt="Savings icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Withdrawal
										</p>
									</div>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({selected}) => (
									<div
										className={`text-center w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? outbox2 : contract}
											alt="Savings icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Transaction
										</p>
									</div>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({selected}) => (
									<div
										className={`text-center w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? settingsIcon2 : settingsIcon}
											alt="Savings icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Settings
										</p>
									</div>
								)}
							</Tab>
						</div>
						<Tab.List className="text-center text-white">
							<Tab disabled as={Fragment}>
								{({selected}) => (
									<div
										className={`text-center w-full py-4 pl-4 flex items-center gap-2 cursor-pointer ${
											selected &&
											"bg-[#FCFCFC] border-l-[3px] rounded-t-lg rounded-l-lg border-black text-black outline-none"
										}`}
									>
										<img
											src={selected ? settingsIcon2 : support}
											alt="Savings icon"
											className="w-6 lg:w-8"
										/>
										<p className="text-lg font-medium lg:text-[23px] hidden md:block">
											Support
										</p>
									</div>
								)}
							</Tab>
						</Tab.List>
					</Tab.List>

					<Tab.Panels className="overflow-x-auto w-full">
						<Tab.Panel>
							<DashHome />
						</Tab.Panel>
						<Tab.Panel>
							<Savings />
						</Tab.Panel>
						<Tab.Panel>
							<Withdrawal />
						</Tab.Panel>
						<Tab.Panel>
							<TransactionPage />
						</Tab.Panel>
						<Tab.Panel></Tab.Panel>
					</Tab.Panels>
				</div>
			</Tab.Group>
		</section>
	);
};

export default Sidebar;
