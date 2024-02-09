import DashLoginProfile from "../../components-landingPage/DashLoginProfile";
import "./TransactionPage.css";
import {TransactionCard} from "./component/TransactionCard";
import {Button} from "./component/button";
import {TransactionData} from "./component/TransactionObject";

export const TransactionPage = () => {
	return (
		<div className="p-8">
			<DashLoginProfile />
			<h2 className="transaction_history ">Transaction History </h2>
			<span className="w-full flex justify-end">
				<Button
					btn_style="btn_container"
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
