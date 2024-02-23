import React, {useEffect, useState, useContext} from "react";
import "./modal.css";
import LilacButton from "../Button/LilacButton";
import forwardEmail from "../../assets/forward_to_inbox.png";
import OTPModal from "./OTPModal";
import ModalDisplayContex from "../../context/modalDisplay";
import {Link} from "react-router-dom";
import Input from "../Input/Input";

function SavingPool({onClick}) {
	const [dis, setDis] = useState("none");

	return (
		<>
			<div>
				<div id="myModal" className="modal">
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
									<h3 className="create">Saving Pool</h3>
								</div>
							</div>
							<p className="create-text customer-text">
								All fields are required to join a pool
							</p>

							<div className="modal-body">
								<div>
									<label htmlFor="name">Amount</label>
								</div>
								<div>
									<Input
										placeholder="Enter your your savings amount"
										name="name"
										// inputValue={name}
										// inputChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="email">Savings Frequency</label>
								</div>
								<div>
									<select className="input" name="" id="" required>
										<option
											className="select"
											value=""
											selected
											disabled
											hidden
										>
											Select your savings frequency
										</option>
										<option value="">Daily</option>
										<option value="">Weekly</option>
										<option value="">Monthly</option>
									</select>
								</div>
								<div>
									<label htmlFor="phone">Savings Duration</label>
								</div>
								<div>
									<select className="input" name="" id="" required>
										<option value="" selected disabled>
											Select your savings duration
										</option>
										<option value="5000">NGN 5,000</option>
										<option value="5000">NGN 10,000</option>
										<option value="5000">NGN 20,000</option>
										<option value="5000">NGN 30,000</option>
										<option value="5000">NGN 50,000</option>
										<option value="5000">NGN 100,000</option>
										<option value="5000">NGN 150,000</option>
										<option value="5000">NGN 200,000</option>
										<option value="5000">NGN 500,000</option>
									</select>
								</div>
								<div>
									<label htmlFor="password">Debit Date</label>
								</div>
								<div>
									<Input
										placeholder="Enter the account number"
										name="name"
										type="date"
										//  inputValue={password}
										//  inputChange={(e) => {setPassword(e.target.value)
										//     setDisplay('none')
										// }}
									/>
									{/* <span className='password-span' style={spanStyle}>Password must be at least 8 characters, one number and one special character</span> */}
								</div>

								<div className="checkbox-div terms-para">
									<div>
										<input className="check" type="checkbox" name="" id="" />
									</div>
									<div>
										<p>
											Accept <span className="modal-span">Terms and Rules</span>{" "}
											of Savings
										</p>
									</div>
								</div>
								<div className="checkbox-div terms-para">
									<p>
										By Clicking on submit you agreed to a direct debit from the
										bank privided in your{" "}
										<span className="modal-span">KYC</span>{" "}
									</p>
								</div>

								<div className="short-btn">
									<div style={{width: "45%"}}>
										<LilacButton
											title="Back"
											onClick={onClick}
											color="var(--pink)"
											textColor="black"
											width="100%"
										/>
									</div>
									<div style={{width: "45%"}}>
										<LilacButton title="Submit" width="100%" />
									</div>
								</div>
							</div>

							{/* <Modal/>    */}
							{/* <OTPModal displayStyle={otpModal? otpModal : 'none'}/>            */}
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default SavingPool;
