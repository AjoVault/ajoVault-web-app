import React from "react";
import DashLoginProfile from "../../components-landingPage/DashLoginProfile";
import "./SettingPage.css";
import {Button} from "../TransactionPage/component/button";

const Settings = () => {
	return (
		<div className="p-8">
			<DashLoginProfile />
			<div className="w-full h-full flex  flex-col">
				<h2 className="text-[3rem] font-bold pb-24 ">Accounts Settings</h2>
				<div className=" flex h-full ">
					<div className="w-[40%]">
						<div className="w-[80%] flex justify-center  rounded-md h-[700px] p-4 drop-shadow-lg py-16 bg-white ">
							<div className="text-[2rem] flex flex-col gap-8 font-semibold ">
								<div>Profile Settings</div>
								<div>Password</div>
								<div>Bank Details</div>
								<div>Invite Others </div>
							</div>
							<Button btn_text="Log out" />
						</div>
					</div>
					<div className="w-[60%] h-full bg-blue-500">eghr</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
