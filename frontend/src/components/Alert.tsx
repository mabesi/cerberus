"use client"

export type AlertProps = {
    show: boolean;
    type: string;
    message: string | { message: string };
    onCloseAlert?: () => void
}

function Alert(props: AlertProps) {

    function alertType() : string {
        if (props.type === "info")
            return "bg-emerald-500";
        else if (props.type === "warn")
            return "bg-orange-500";
        else if (props.type === "error")
            return "bg-red-500";
        else
            return "bg-slate-500";
    }

    function alertText() : string {
        if (props.type === "info")
            return "Success => ";
        else if (props.type === "warn")
            return "Warning => ";
        else if (props.type === "error")
            return "Error => ";
        else
            return "";
    }

    function alertIcon() : string {
        if (props.type === "info")
            return "fa-bell";
        else if (props.type === "warn")
            return "fa-bell-exclamation";
        else if (props.type === "error")
            return "fa-radiation";
        else
            return "fa-bell";
    }

    return (
        <>
            {props.show
            ? (
                <div
                    className={`text-white mt-3 px-6 py-4 border-0 rounded relative mb-5 ${alertType()}`}
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className={`fas ${alertIcon()}`} />&nbsp;
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize"> {alertText()} </b>
                        {
                            typeof props.message === "string"
                                ? props.message
                                : JSON.stringify(props.message.message)
                        }
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 p-5 pt-0 outline-none focus:outline-none"
                        onClick={props.onCloseAlert}
                    >
                        <span>×</span>
                    </button>
                </div>
            )
            : null}
        </>
    )
}

export default Alert;