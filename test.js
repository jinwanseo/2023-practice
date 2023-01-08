const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

console.log(koDtf.format(new Date()));
