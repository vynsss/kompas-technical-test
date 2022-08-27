const app = Vue.createApp({
    data(){
        return{
            entry: {
                "detail": [
                    {
                        "jam": "03:15",
                        "tanggal":"18 Februari 2021",
                        "nama":"Ayam Tangkap",
                        "pengeluaraan":77249
                    },
                    {
                        "jam": "03:15",
                        "tanggal":"18 Februari 2021",
                        "nama":"Mie Rebus",
                        "pengeluaraan":32154
                    },
                    {
                        "jam": "00:20",
                        "tanggal":"17 Februari 2021",
                        "nama":"Soto Kuning",
                        "pengeluaraan":34992
                    },
                    {
                        "jam": "05:59",
                        "tanggal":"17 Februari 2021",
                        "nama":"Ayam Geprek",
                        "pengeluaraan":37674
                    },
                    {
                        "jam": "05:45",
                        "tanggal":"16 Februari 2021",
                        "nama":"Otak-otak",
                        "pengeluaraan":11971
                    }
                ],
            },
            newName: "",
            newExpense: 0
        }
    },
    computed:{
        totalExpense(){
            let total = 0;
            let entry = this.entry["detail"]
            for(let i in entry){
                total += entry[i].pengeluaraan
            }
            return total;
        },
        dateList() {
            let entry = this.entry["detail"]
            // date is a temp array for checking
            let date = [], dayList = [], count = 0;
            for(let i in entry){
                // if it doesn't exist yet in the 'date'
                if(!date.includes(entry[i].tanggal)) {
                    date.push(entry[i].tanggal)
                    dayList.push({
                        date: entry[i].tanggal, 
                        data:[entry[i]],
                        total: entry[i].pengeluaraan
                    })
                } else {
                    dayList[date.length-1].data.push(entry[i]);
                    dayList[date.length-1].total += entry[i].pengeluaraan
                }
            }
            return dayList
        },
        // if name is empty or expense is lower than 0, submit button will be disabled
        inputValidation(){
            if(this.newExpense == null || this.newExpense < 0 || this.newName == "") return true;
            return false;
        }
    },
    methods: {
        addEntry(){
            let d = new Date;
            let time = (d.getHours() < 10 ? "0"+d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes())
            let newEntry = {
                "jam": time,
                "tanggal": "19 Februari 2021",
                "nama": this.newName,
                "pengeluaraan": parseInt(this.newExpense)
            }
            this.entry["detail"].unshift(newEntry)

            this.newName = "";
            this.newExpense = 0;
        }
    }
})
app.mount("#app");