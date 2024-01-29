const ContributionSavingsCard = () => {
    const data = [
        {
            id: 1,
            heading: "Pooled Contribution",
            price: "300,000",
        },
        {
            id: 2,
            heading: "Personal Savings",
            price: "200,000",
        },
    ];
    return (
        <div className="flex gap-10 md:justify-between w-[90%]">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="text-nowrap rounded-lg border-2 py-6 px-4 border-[#5E0035] font-poppins savingsCard "
                >
                    <h3 className="text-[19px] text-center font-medium">
                        {item.heading}
                    </h3>
                    <div className="flex gap-2 items-center">
                        <h4 className="text-[#808080] text-sm">Balance</h4>
                        <p className="text-[#5A47CF] text-2xl font-semibold">
                            NGN {item.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContributionSavingsCard;
