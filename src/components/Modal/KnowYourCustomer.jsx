import React, {useEffect, useState, useContext} from "react";
import "./modal.css";
import LilacButton from "../Button/LilacButton";
import forwardEmail from "../../assets/forward_to_inbox.png";
import OTPModal from "./OTPModal";
import ModalDisplayContex from "../../context/modalDisplay";
import {Link} from "react-router-dom";
import UserContext from "../../context/userContext";
import Input from "../Input/Input";
import CaptureImage from "./CaptureImage";

function KnowYourCustomer({onClick}) {
	const [nin, setNin] = useState("");
	const [bvn, setBvn] = useState("");
	const [acctNumber, setAcctNumber] = useState("");
	const [occupation, setOccupation] = useState("");
	const [date, setDate] = useState("");
	const [bankCode, setBankCode] = useState("");
	const {user, setUser} = useContext(UserContext);
	const [showFaceCapture, setShowFaceCapture] = useState(false);

	const [dis, setDis] = useState("block");

	let modalstyle = {
		display: dis,
	};

	const submitDetails = () => {
		setUser({
			id: 1,
			email: "alizzyshire@gmail",
			nin,
			bvn,
			acctNumber,
			occupation,
			date,
			bankCode,
		});
		setShowFaceCapture(true);
		// if (window.WebcamHelper && window.WebcamHelper.capture()) {
		// 	let imgData = window.WebcamHelper.getImage();
		// 	user.faceImg = imgData;
		// 	console.log("imgdata", imgData);
		// } else {
		// 	alert("Unable to access webcam");
		// }
	};

	//   console.log(formData)

	return (
		<div>
			<div id="myModal" className="modal" style={{modalstyle}}>
				<span className="close" onClick={() => setDis("none")}>
					&times;
				</span>

				{/* Modal content */}
				<div className="modal-content modal-header">
					<form
						className=""
						action=""
						// onSubmit={handleSubmit}
					>
						<div className="acct customer-div">
							<div className="">
								<h3 className="create">Know Your Customer</h3>
							</div>
						</div>
						<p className="create-text customer-text">
							All fields are required to secure your account
						</p>

						<div className="modal-body">
							<div>
								<label htmlFor="nin">National Identity Number</label>
							</div>
							<div>
								<Input
									placeholder="Enter your NIN"
									name="nin"
									inputValue={nin}
									inputChange={(e) => setNin(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="BVN">Bank Verification Number</label>
							</div>
							<div>
								<Input
									placeholder="Enter your BVN"
									name="phone"
									type="password"
									inputValue={bvn}
									inputChange={(e) => setBvn(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="bank">Bank</label>
							</div>
							<div>
								<select
									className="input select"
									name="bank"
									id=""
									value={bankCode}
									onChange={(e) => setBankCode(e.target.value)}
									required
								>
									<option className="select inactive" value="" selected disabled>
										Select your Bank
									</option>
									<option className="select-active" value="044">
										Access Bank
									</option>
									<option value="023"> Citibank</option>
									<option value="050">Ecobank</option>
									<option value="214">First City Monument Bank (FCMB)</option>
									<option value="070">Fidelity Bank</option>
									<option value="011">First Bank</option>
									<option value="058">Guaranty Trust Bank (GTB)</option>
									<option value="030">Heritage Bank</option>
									<option value="301">Jaiz Bank</option>
									<option value="082">Keystone Bank</option>
									<option value="526">Parallex Bank</option>
									<option value="101">Providus Bank</option>
									<option value="221">Stanbic IBTC Bank</option>
									<option value="076">Skye Bank</option>
									<option value="068">Standard Chartered Bank</option>
									<option value="232">Sterling Bank</option>
									<option value="100">Suntrust Bank</option>
									<option value="102"> Titan Trust Bank</option>
									<option value="032">Union Bank</option>
									<option value="033">United Bank for Africa (UBA)</option>
									<option value="215">Unity Bank</option>
									<option value="035">Wema Bank</option>
									<option value="052">Zenith Bank</option>
								</select>
							</div>
							<div>
								<label htmlFor="accountNumber">Account Number</label>
							</div>
							<div>
								<Input
									placeholder="Enter the account number"
									name="accountNumber"
									type="text"
									inputValue={acctNumber}
									inputChange={(e) => setAcctNumber(e.target.value)}
								/>
								{/* <span className='password-span' style={spanStyle}>Password must be at least 8 characters, one number and one special character</span> */}
							</div>
							<div>
								<label htmlFor="occupation">Occupation</label>
							</div>
							<div>
								<Input
									placeholder="Enter your occupation"
									name="occupation"
									inputValue={occupation}
									inputChange={(e) => setOccupation(e.target.value)}
									required={false}
								/>
							</div>
							<div>
								<label htmlFor="date">Date of Birth</label>
							</div>
							<div>
								<input
									type="date"
									className="input"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>

							<div className="short-btn">
								<div style={{width: "45%"}}>
									<LilacButton
										title="Back"
										color="var(--pink)"
										textColor="black"
										width="100%"
										onClick={onClick}
									/>
								</div>
								<div style={{width: "45%"}}>
									<LilacButton
										title="Next"
										width="100%"
										onClick={submitDetails}
									/>
								</div>
								{showFaceCapture && <CaptureImage />}
							</div>
						</div>

						{/* <Modal/>    */}
						{/* <OTPModal displayStyle={otpModal? otpModal : 'none'}/>            */}
					</form>
				</div>
			</div>
		</div>
	);
}

export default KnowYourCustomer;