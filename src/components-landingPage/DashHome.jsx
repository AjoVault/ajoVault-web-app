import DashLoginProfile from "./DashLoginProfile";
import progressbar from "../assets/progressbar.svg";
import circle from "../assets/circle.svg";
import {Link} from "react-router-dom"
import { useContext } from "react";
import UserContext from "../context/userContext";

const DashHome = () => {
	const {user} = useContext(UserContext)
	return (
		
		<section className="flex flex-col pr-4 pt-10 pb-16 lg:w-[90%] lg:mx-auto">
			<div className="flex gap-3 justify-end items-center">
				<DashLoginProfile />
			</div>
			<div className="pt-4 pb-6">
				<h1 className="text-[40px] font-semibold">{user.firstName ? user.firstName : "Isaac"}</h1>
				<p className="text-[#808080] text-lg text-nowrap">
					Hello, let&apos;s build today!
				</p>
			</div>
			<section className="flex gap-6 lg:justify-between items-center flex-col lg:flex-row">
				<div className="bg-[#E2DDFE] shrink-0 text-center px-4 py-8 rounded-lg max-md:w-full lg:w-1/2">
					<h1 className="font-medium text-xl">
							Complete your KYC to set up your account
					</h1>
						
					
					<img src={progressbar} alt="progress bar" className="py-6" />
					<button className="text-white bg-[#5A47CF] text-center rounded-lg py-3 px-8">
						Continue
					</button>
				</div>

				<div className="shrink-0 mb-12">
					<h1 className="text-[33px] font-semibold">To do list</h1>
					<div className="bg-white flex flex-col gap-3 rounded-lg card0 px-2 py-4">
						<div className="flex gap-4 items-center">
							<img src={circle} alt="circle" className="w-4" />
							<h3 className="font-normal text-[23px]">Complete KYC</h3>
						</div>
						<div className="flex gap-4 items-center">
							<img src={circle} alt="circle" className="w-4" />
							<h3 className="font-normal text-[23px]">
								Link bank for a direct debit
							</h3>
						</div>
						<div className="flex gap-4 items-center">
							<img src={circle} alt="circle" className="w-4" />
							<h3 className="font-normal text-[23px]">Join a savings plan</h3>
						</div>
						<div className="flex gap-4 items-center">
							<img src={circle} alt="circle" className="w-4" />
							<h3 className="font-normal text-[23px]">
								Invite friends to earn bonus
							</h3>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col">
				<h1 className="text-[33px] font-semibold text-nowrap">Quick Access</h1>
				<section className="pt-10 flex gap-10 lg:justify-between flex-col lg:flex-row">
					<div className="flex flex-col gap-4 shrink-0 bg-[#5A47CF] text-white card1 py-6 px-10">
						<h3 className="text-2xl">
							Pooled <br /> Contribution
						</h3>
						<p className="max-w-44 pb-4">
							Join a batch savings pool based on your budget
						</p>
						<button className="border-2 border-[#5E0035] py-3 rounded-lg">
							Join Now
						</button>
					</div>
					<div className="flex flex-col gap-3 shrink-0 bg-[#5E0035] card2 text-white py-6 px-10">
						<h3 className="text-2xl">
							Personal <br /> Savings
						</h3>
						<p className="max-w-[11rem] pb-4">
							Start a personal savings to meet your goal
						</p>
						<button className="border-2 border-[#5A47CF] py-3 rounded-lg">
							Start Now
						</button>
					</div>
					<div className="flex flex-col gap-3 shrink-0 bg-[#B5AAFC] card3 py-6 px-10">
						<h3 className="text-2xl">
							Creating a <br /> Savings Pool
						</h3>
						<p className="max-w-[12rem] pb-4">
							Invite friends to create a pooled contribution that works for all
						</p>
						<button className="border-2 border-[#5A47CF] rounded-lg py-3">
							Create Now
						</button>
					</div>
				</section>
			</section>
		</section>
	);
};

export default DashHome;
