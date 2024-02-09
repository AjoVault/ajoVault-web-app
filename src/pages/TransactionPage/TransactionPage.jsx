import {useState} from "react";
import DashLoginProfile from "../../components-landingPage/DashLoginProfile";
import "./TransactionPage.css";
import {TransactionCard} from "./component/TransactionCard";
import {Button} from "./component/button";
import {TransactionData} from "./component/TransactionObject";

export const TransactionPage = () => {
	const [click, setOnClick] = useState(true);
	const handleClick = () => {
		setOnClick(() => !click);
	};

	return (
		<div className="lg:p-8 lg:px-16">
			<DashLoginProfile />
			<h2 className="transaction_history ">Transaction History </h2>
			<div className={click ? "hide" : "visible"}>
				{" "}
				<div className="w-full h-full flex items-center justify-center bg-black ">
					<div className="w-[30%] h-[40%] z-100 abolute top-0 bg-white rounded-md">
						<div className="flex flex-col items-center bg-blue-900 rounded-tl-md rounded-tr-md h-12 w-full">
							<h3 className="text-white text-[1.5rem]">Account Statement</h3>
						</div>
						<div className="flex flex-col gap-8 justify-center h-[80%] items-center px-8">
							<form>
								<label className="flex flex-col rounded-md ">
									<h4>Start Date</h4>
									<input
										className="w-full border-2 border-blue-500 p-2"
										type="date"
									/>
								</label>
								<label className="flex flex-col rounded-md ">
									<h4>End Date</h4>
									<input
										className="w-full border-2 border-blue-500 p-2"
										type="date"
									/>
								</label>
								<div className="pt-12">
									<Button
										btn_style="bg-pink-300 font-bold px-24 py-4 rounded-lg"
										btn_text="Cancel"
										onClick={handleClick}
									/>
									<Button
										btn_style="bg-blue-600 font-bold text-white ml-4 px-24 py-4 rounded-lg"
										btn_text="Submit"
										onClick={handleClick}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<span className="w-full flex justify-end">
				<Button
					onClick={handleClick}
					btn_style="btn_container max-sm:mx-4 max-sm:mb-8"
					btn_text="Generate Account Statement"
				/>
			</span>
			<div className="flex flex-col gap-2">
				{TransactionData.map((data, index) => (
					<TransactionCard key={index} data={data} />
				))}
			</div>
			<div className="w-full lg:w-[60%] pt-8 flex justify-center">
				<Button btn_style="btn_load_container" btn_text="Load more  History" />
			</div>
		</div>
	);
};
