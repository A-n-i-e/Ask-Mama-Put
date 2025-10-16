import Send from "./assets/send.svg"
export default function Chat(){
    return (
        <div className="w-screen h-screen flex flex-col justify-center bg-[url('./assets/background.png')] bg-cover">
            <div className="w-full bg-light p-6 text-center fixed top-0">
                <h1 className="font-montserrat text-4xl">Ask Mama Put 👩🏿‍🍳</h1>
            </div>
            <div>
                yes
            </div>
            <div className=" p-2 bg-light m-2 flex align-center fixed bottom-0 w-full">
                <input type="text" className="bg-white rounded-md p-2 w-full" placeholder="Let us cook..." />
                <button className="bg-transparent border-0 p-0">
                    <img src={Send} className="w-8 h-8 ml-2" />
                </button>
            </div>
        </div>
    )
}