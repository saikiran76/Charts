export const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    // const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}H:${minutes}M`;
  };

export const reusable_classnames = "border-[#1B3D58] border-l-[0.25rem] border-r-[0.25rem] border-t-[0.25rem] border-b-[0.25rem] p-[2em] lg:p-[5em] rounded-lg shadow-[#9F2F50] shadow-lg bg-[#0F172A] flex justify-center hover:transition-all duration-200 hover:transform hover:scale-110";