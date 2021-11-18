"use strict";
window.addEventListener('DOMContentLoaded', function() {

    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        selectTable();
        allClearLocalStorage();
    }
}, false);

const saveLocalStorage = () => {
    const save = document.getElementById('save');
    save.addEventListener("click", (el) => {
        el.preventDefault();
        const key = document.querySelector("#textKey").value;
        const value = document.querySelector("#textMemo").value;

        //    check textarea is null 
        check_textArea(key, value);

        if (key == "" || value == "") {
            notice_wanning();
        } else {
            localStorage.setItem(key, value);
            let w_save = confirm(`LocalStorageに[${key} ${value}]を保存しますか？`);
            if (w_save === true) {
                viewStorage();
                notice_success();
                document.querySelector("#textKey").value = "";
                document.querySelector("#textMemo").value = "";
                location.reload(false);
            }
        }
    }, false)
};
// viewStorage function 
const viewStorage = () => {
    const list = document.querySelector('#list');
    while (list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = `<input type="checkbox" name="checkbox1">`
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = `<i class="far fa-trash-alt delItem"></i>`;
    }
    // jquery function
    $("#table1").tablesorter({
        sortList: [
            [1, 0]
        ]
    });
    $("#table1").trigger("update");
}

//delLocalStorage function
const delLocalStorage = () => {
    // 選んだものを削除薄る
    const deleteItem = document.querySelector('#deleteItem');
    deleteItem.addEventListener('click',(e)=>{
        e.preventDefault();
        const chkbox1 = document.getElementsByName("checkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt = 0;
        w_cnt = selectCheckBox_mode("del");
    
    
        if(w_cnt >= 1){
            let w_confirm = window.confirm(`LocalStorageから選択されている${w_cnt}件を削除(delete)しますか？`)
            if(w_confirm === true){
                for(let i = 0;i < chkbox1.length;i++){
                    if(chkbox1[i].checked){
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data)
                    }
                }
                viewStorage();
                let w_msg = `LocalStorageから選択されている${w_cnt}件を削除(delete)しました。`;
                window.alert(w_msg);
            }
        }
    })

    // 一つを削除する
    const del = document.querySelectorAll('.delItem');
    del.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectCheckBox();
            
            if (w_sel === "1") {
                const key = document.querySelector('#textKey').value;
                const value = document.querySelector('#textMemo').value;
                localStorage.removeItem(key);
                let w_delete = confirm(`LocalStorageに[${key} ${value}]を削除しますか？`);
                if (w_delete === true) {
                    viewStorage();
                    let w_msg = `LocalStorageから${key} ${value}を削除(delete)しました！`;
                    window.alert(w_msg);
                    document.querySelector("#textKey").value = "";
                    document.querySelector("#textMemo").value = "";
                    location.reload(false);
                }
            }
        })
    }), false
}

// select table function
const selectTable = () => {
    const table = document.querySelector("#select");
    table.addEventListener('click', (e) => {
        e.preventDefault();
        selectCheckBox();
        selectCheckBox_mode("select");
    }, false)
}
////////////////////////////////
const selectCheckBox_mode = (mode) =>{
    let w_cnt = 0;
    const checkbox1 = document.getElementsByName('checkbox1');
    const table1 = document.getElementById('table1');
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < checkbox1.length; i++) {
        if (checkbox1[i].checked) {
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.querySelector('#textKey').value = w_textKey;
    document.querySelector('#textMemo').value = w_textMemo;

    if(mode === "select"){
        if(w_cnt === 1) return w_cnt;
        else  window.alert("1つを選択(select)してください");
    }
    if(mode === "del"){
        if(w_cnt >= 1) return w_cnt;
        else  window.alert("1つを選択(select)してください");
    }
}
/////////////////////////////////
const selectCheckBox = () => {
        let w_sel = "0";
        let w_cnt = 0;
        const checkbox1 = document.getElementsByName('checkbox1');
        const table1 = document.getElementById('table1');
        let w_textKey = "";
        let w_textMemo = "";

        for (let i = 0; i < checkbox1.length; i++) {
            if (checkbox1[i].checked) {
                if(w_cnt === 0){
                    w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                    w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                }
                w_cnt++;
            }
        }
        document.querySelector('#textKey').value = w_textKey;
        document.querySelector('#textMemo').value = w_textMemo;

        if(w_cnt === 1) return w_sel = "1";
        else  window.alert("1つを選択(select)してください");
    }
    // clear all localstorage function
const allClearLocalStorage = () => {
    const allClear = document.querySelector('#allClear');
    allClear.addEventListener('click', (e) => {
        e.preventDefault();
        let w_confirm = confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか？");
        if (w_confirm === true) {
            localStorage.clear();
            viewStorage();
            let w_msg = "LocalStorageのデータをすべて削除(all clear)しました！";
            window.alert(w_msg);
            document.querySelector("#textKey").value = "";
            document.querySelector("#textMemo").value = "";
        }
    });
}

// notice function///
const notice_error = document.querySelector('.notice_wanning');
const notice_succ = document.querySelector('.notice_success');
const text_area = document.querySelectorAll('textarea');

const notice_mes = (mes,delay) => {
    mes.querySelector('.notice').style.animation = `notice ${1}s ease-in  ${delay}s forwards`;
    const time_down = setTimeout(() => {
        mes.classList.remove('show_notice');
        mes.querySelector('.notice').style.animation = `none`;
    }, 2000);
}
const notice_success = () => {
    notice_mes(notice_succ,1);
    notice_succ.classList.add('show_notice');
}
const notice_wanning = () => {
    notice_mes(notice_error,0.35);
    notice_error.classList.add('show_notice');
};
//    check textarea is null funcion
const check_textArea = (key, value) => {
    document.querySelector("#textKey").style.border = key == "" ? `${2}px solid #fd79a8` : "none";
    document.querySelector("#textKey").style.animation = key == "" ? `boder_shown ${3}s linear forwards` : "none";
    document.querySelector("#textMemo").style.border = value == "" ? `${2}px solid #fd79a8` : "none";
    document.querySelector("#textMemo").style.animation = value == "" ? `boder_shown ${3}s linear forwards` : "none";

    setTimeout(() => {
        document.querySelector("#textKey").style.animation = `none`;
        document.querySelector("#textMemo").style.animation = `none`;
    }, 2500);

    document.querySelectorAll('textarea').forEach(e => {
        e.onblur = (el) => {
            document.querySelector("#textKey").style.border = el.target.value == "" ? `${2}px solid #fd79a8` : "none";
        }
    })
}