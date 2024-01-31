import notification from "../assets/notification.svg";
import dashProfilepic from "../assets/dashprofilepic.svg";

const DashLoginProfile = () => {
    return (
        <div className="flex gap-3 md:justify-end items-center">
            <img src={notification} alt="notification" className="w-6" />
            <p>Isaac</p>
            <img
                src={dashProfilepic}
                alt="dashboard profile picture"
                className="w-8"
            />
        </div>
    );
};

export default DashLoginProfile;
