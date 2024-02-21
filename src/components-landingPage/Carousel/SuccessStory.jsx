import React, { useEffect, useState } from "react";
import { success1, success2, success3 } from "../../assets";

const commentsData = [
    {
        text: "AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
        author: "Annabelle Andrew",
        image: success1,
    },
    {
        text: "I have been able to save up for my dream car in less than 6 months. I am so excited to have found AjoVault. I highly recommend it.",
        author: "Tosin James",
        image: success2,
    },
    {
        text: "AjoVault has been helping me meet most of my bills obligations. I am able to pay my house rent promptly from the pooled contribution. I highly recommend it.",
        author: "Chika Wilson",
        image: success3,
    },
];

const SuccessStory = () => {
    const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCommentIndex((prevIndex) =>
                prevIndex === commentsData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentComment = commentsData[currentCommentIndex];

    return (
        <div className="relative text-white rounded-[8px] h-[80%] flex flex-col justify-center items-center">
            <img src={currentComment.image} className="absolute w-[18%] h-[140px] border-[10px] top-0 rounded-[50%] border-[#4839A6]" alt="" />

            <div className="flex flex-col  justify-center items-center rounded-[4px] h-[70%] mt-4 w-[80%] bg-[#4839A6] text-[20px] font-extralight px-6">
                <p className="leading-10 pb-10 text-center">
                    &apos;{currentComment.text}&apos;
                </p>
                <div className="flex  border-white rounded-[8px] border-[2px] shadow-lg shadow-gray-500/40 px-[30px] h-[50px] justify-center items-center">
                    <h3 className="text-[20px] font-bold">
                        {currentComment.author}
                    </h3>
                </div>
            </div>
            <div className="flex gap-4 mt-8 ">
                {Array.from({ length: commentsData.length }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-[20px] bg-[#b6b1b1] w-[20px] rounded-[50%] ${index === currentCommentIndex ? "bg-[#5e5c5c]  w-[50px] rounded-[45%]" : "bg-[#4839A6]"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};
export default SuccessStory;