import {Button} from "./button";
import {IoIosArrowDown} from "react-icons/io";

export const TransactionCard = ({data}) => {
	return (
		<div className="flex   justify-between max-sm:w-[80%] lg:p-4 bg-[#FFFFFF]  drop-shadow-lg  lg:w-[60%]">
			<div key={data.id} className=" max-sm:w-[50%] lg:w-1/2">
				<div className="flex lg:gap-6">
					<div>
						<img
							className="h-12 w-12 rounded-full object-cover"
							src={data.img}
							alt=" gt bank logo"
						/>
					</div>
					<div>
						<h2 className="text-[#151415] font-medium">{data.name}</h2>
						<h4
							className=" max-sm:text-[0.6rem] text-[0.75rem] font-normal text-[#808080]
"
						>
							<span>Jan 12/02/24</span>
							<span>8:02pm</span>
						</h4>
					</div>
				</div>
			</div>
			<div className="w-[40%] lg:w-1/2 flex justify-end">
				<div className="flex w-[40%]">
					<span className="text-[#319F43]  max-sm:text-[1rem] text-[1.5rem] font-medium">
						NGN 50,000
					</span>
					<Button btn_text={<IoIosArrowDown />} btn_style="ml-3 " />
				</div>
			</div>
		</div>
	);
};
