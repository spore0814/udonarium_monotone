void((function(undefined){
    try {
        let url;
        let bloburl;
        let a;

        let oSerializer;
        let sXML;

        let characterName;
        let playerName;
        let HP;
        let MP;
        let exfoliation;
        let characterLevel;
        let classes = new Array(document.getElementById('classes').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        let baseExfoliation;
        let lifepath =[,];
        let connection = new Array(document.getElementById('lifepath.connection').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        let items = new Array(document.getElementById('items').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        let abilityScore = [,,,,,];
        let battleAbility = [,,,,,,];
        let specials = new Array(document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        let skillsName = new Array(document.getElementById('skills').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        let skillsData = new Array(document.getElementById('skills').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length);
        if(location.hostname !== 'character-sheets.appspot.com'){
            window.alert('このサイトでは使用できません');
            return;
        }

        function makeNormalElement(eName,eAttrubute,eText){
            let elem = document.createElement('data');
            elem.setAttribute(eName,eAttrubute);
            elem.innerText = eText;
            return elem;
        }

        function makeResourceElement(rName,rAttribute,rText,rCurrent){
            let elem = document.createElement('data');
            elem.setAttribute('type','numberResource');
            elem.setAttribute('currentValue',rCurrent);
            elem.setAttribute(rName,rAttribute);
            elem.innerText = rText;
            return elem;
        }

        function makeNoteElement(nName,nAttribute,nText){
            let elem = document.createElement('data');
            elem.setAttribute('type','note');
            elem.setAttribute(nName,nAttribute);
            elem.innerText = nText;
            return elem;
        }

        // 変数に取り込み
        characterName = document.getElementById('base.name').value;
        playerName = document.getElementById('base.player').value;
        exfoliation = document.getElementById('base.exfoliation.value').value;
        characterLevel = document.getElementById('base.level').value;
        for(let i = 0; i < classes.length; i++){
            classes[i] = {'name':document.getElementById('classes').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('select')[0].value,'level':document.getElementById('classes').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value};
        }
        baseExfoliation = document.getElementById('base.exfoliation.init').value;
        for(let i = 0; i < 2; i++){
            lifepath[i] = document.getElementById('lifepath').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i+1].getElementsByTagName('td')[0].firstElementChild.value + '/' + document.getElementById('lifepath').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i+1].getElementsByTagName('td')[1].firstElementChild.value;
        }
        for(let i = 0; i < connection.length; i++){
            connection[i] = {'name':document.getElementById('lifepath.connection').getElementsByTagName('tr')[i+1].getElementsByTagName('td')[1].firstElementChild.value,'description':document.getElementById('lifepath.connection').getElementsByTagName('tr')[i+1].getElementsByTagName('td')[2].firstElementChild.value};
        }
        for(let i = 0; i < items.length; i++){
            items[i] = {'name':document.getElementById('items').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].firstElementChild.value,'description':document.getElementById('items').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].firstElementChild.value};
        }
        for(let i = 0; i < 6; i++){
            abilityScore[i] = document.getElementById('abl').getElementsByTagName('tr')[8].getElementsByTagName('td')[i].firstElementChild.value;
        }
        for(let i = 0; i < 7; i++){
            battleAbility[i] = document.getElementById('outfits.total').getElementsByClassName('input')[i+1].firstElementChild.value;
        }
        for(let i = 0; i < specials.length; i++){
            specials[i] = {'name':document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].firstElementChild.value,'description':document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].firstElementChild.value + '/' + document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].firstElementChild.value + '/' + document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].firstElementChild.value + '/' + document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[4].firstElementChild.value + '/' + document.getElementById('specials').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[5].firstElementChild.value};
        }
        for(let i = 0; i < skillsName.length; i++){
            let j = 1;
            skillsName[i] = document.getElementById('skills').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].firstElementChild.value;
            skillsData[i] = '';
            while(true){
                skillsData[i] += document.getElementById('skills').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[j].firstElementChild.value;
                if(j>=10){
                    break;
                }
                skillsData[i] += '/';
                j++;
            }
        }
        HP = battleAbility[5];
        MP = battleAbility[6];
        // 変数に取り込みここまで

        // ツリーを作る
        // 一番外(character)
        let charElem = document.createElement('character');
        charElem.setAttribute('location.name','table');
        charElem.setAttribute('location.x','0');
        charElem.setAttribute('location.y','0');
        charElem.setAttribute('posZ','0');
        charElem.setAttribute('rotate','0');
        charElem.setAttribute('roll','0');

        // 2段目
        let dataChar = makeNormalElement('name','character','');

        // 3段目の1
        let dataImg = makeNormalElement('name','image','');
        let imgChild = document.createElement('data');
        imgChild.setAttribute('type','image');
        imgChild.setAttribute('name','imageIdentifier');
        dataImg.appendChild(imgChild);
        dataChar.appendChild(dataImg);

        // 3段目の2
        let dataCommon = makeNormalElement('name','common','');
        let dataName = makeNormalElement('name','name',characterName);
        dataCommon.appendChild(dataName);
        let dataSize = makeNormalElement('name','size','1');
        dataCommon.appendChild(dataSize);
        dataChar.appendChild(dataCommon);

        // 3段目の3(details)
        let dataDetail = makeNormalElement('name','detail','');

        // リソース
        let dataResource = makeNormalElement('name','リソース','');
        let dataHP = makeResourceElement('name','HP',HP,HP);
        let dataMP = makeResourceElement('name','MP',MP,MP);
        let dataExfoliation = makeResourceElement('name','剥離値',baseExfoliation,exfoliation);
        dataResource.appendChild(dataHP);
        dataResource.appendChild(dataMP);
        dataResource.appendChild(dataExfoliation);
        dataDetail.appendChild(dataResource);

        // ステータス
        let dataStatus = makeNormalElement('name','ステータス','');
        let dataLevel = makeNormalElement('name','演者レベル',characterLevel);
        let dataClasses = makeNormalElement('name','クラス','');
        let dataClassesChild = new Array(classes.length);
        for(let i = 0; i < dataClassesChild.length; i++){
            dataClassesChild[i] = makeNormalElement('name',classes[i].name,classes[i].level);
            dataClasses.appendChild(dataClassesChild[i]);
        }
        let dataBaseExfoliation = makeNormalElement('name','基本剥離値',baseExfoliation);
        dataStatus.appendChild(dataLevel);
        dataStatus.appendChild(dataClasses);
        dataStatus.appendChild(dataBaseExfoliation);
        dataDetail.appendChild(dataStatus);

        // 配役
        let dataLifepath = makeNormalElement('name','配役','');
        let dataOrigin = makeNormalElement('name','出自',lifepath[0]);
        let dataSurrounding = makeNormalElement('name','境遇',lifepath[1]);
        let dataConnection = makeNormalElement('name','パートナー','');
        let dataConnectionChild = new Array(connection.length);
        for(let i = 0; i < dataConnectionChild.length; i++){
            dataConnectionChild[i] = makeNormalElement('name',connection[i].name,connection[i].description);
            dataConnection.appendChild(dataConnectionChild[i]);
        }
        dataLifepath.appendChild(dataOrigin);
        dataLifepath.appendChild(dataSurrounding);
        dataLifepath.appendChild(dataConnection);
        dataDetail.appendChild(dataLifepath);

        // アイテム
        let dataItems = makeNormalElement('name','アイテム','');
        let dataItemsChild = new Array(items.length);
        for(let i = 0; i < dataItemsChild.length; i++){
            dataItemsChild[i] = makeNormalElement('name',items[i].name,items[i].description);
            dataItems.appendChild(dataItemsChild[i]);
        }
        dataDetail.appendChild(dataItems);

        // 能力値
        let dataAbilityScore = makeNormalElement('name','能力値','');
        let dataAbilityScoreChild = new Array(abilityScore.length);
        dataAbilityScoreChild[0] = makeNormalElement('name','肉体',abilityScore[0]);
        dataAbilityScoreChild[1] = makeNormalElement('name','知覚',abilityScore[1]);
        dataAbilityScoreChild[2] = makeNormalElement('name','意志',abilityScore[2]);
        dataAbilityScoreChild[3] = makeNormalElement('name','感応',abilityScore[3]);
        dataAbilityScoreChild[4] = makeNormalElement('name','社会',abilityScore[4]);
        dataAbilityScoreChild[5] = makeNormalElement('name','縫製',abilityScore[5]);
        for(let i = 0; i < dataAbilityScoreChild.length; i++){
            dataAbilityScore.appendChild(dataAbilityScoreChild[i]);
        }
        dataDetail.appendChild(dataAbilityScore);

        // 戦闘値
        let dataBattleAbility = makeNormalElement('name','戦闘値','');
        let dataBattleAbilityChild = new Array(battleAbility.length);
        dataBattleAbilityChild[0] = makeNormalElement('name','命中値',battleAbility[0]);
        dataBattleAbilityChild[1] = makeNormalElement('name','回避値',battleAbility[1]);
        dataBattleAbilityChild[2] = makeNormalElement('name','術操値',battleAbility[2]);
        dataBattleAbilityChild[3] = makeNormalElement('name','抵抗値',battleAbility[3]);
        dataBattleAbilityChild[4] = makeNormalElement('name','行動値',battleAbility[4]);
        dataBattleAbilityChild[5] = makeNormalElement('name','耐久力',battleAbility[5]);
        dataBattleAbilityChild[6] = makeNormalElement('name','精神力',battleAbility[6]);
        for(let i = 0; i < dataBattleAbilityChild.length; i++){
            dataBattleAbility.appendChild(dataBattleAbilityChild[i]);
        }
        dataDetail.appendChild(dataBattleAbility);

        // 逸脱能力
        let dataSpecials = makeNormalElement('name','逸脱能力','');
        let dataSpecialsChild = new Array(specials.length);
        for(let i = 0; i < dataSpecialsChild.length; i++){
            dataSpecialsChild[i] = makeNormalElement('name',specials[i].name,specials[i].description);
            dataSpecials.appendChild(dataSpecialsChild[i]);
        }
        dataDetail.appendChild(dataSpecials);

        // 特技
        let dataSkills = makeNormalElement('name','特技','');
        let dataSkillsChild = new Array(skillsName.length);
        for(let i = 0; i < dataSkillsChild.length; i++){
            dataSkillsChild[i] = makeNormalElement('name',skillsName[i],skillsData[i]);
            dataSkills.appendChild(dataSkillsChild[i]);
        }
        dataDetail.appendChild(dataSkills);

        // メモ
        let dataNote = makeNoteElement('name','メモ',playerName);
        dataDetail.appendChild(dataNote);

        dataChar.appendChild(dataDetail);
        charElem.appendChild(dataChar);

        // チャットパレット
        let chatPalette = document.createElement('chat-palette');
        chatPalette.setAttribute('dicebot','MonotoneMusium');
        let chatText = '2d6+{肉体} 肉体\n2d6+{知覚} 知覚\n2d6+{意志} 意志\n2d6+{感応} 感応\n2d6+{社会} 社会\n2d6+{縫製} 縫製\n\n2d6+{命中値} 命中値\n2d6+{回避値} 回避値\n2d6+{術操値} 術操値\n2d6+{抵抗値} 抵抗値\n';
        for(let i = 0; i < skillsName.length; i++){
            chatText += '\n' + skillsName[i] + '/' + skillsData[i];
        }
        chatText += '\n';
        for(let i = 0; i < specials.length; i++){
            chatText += '\n' + specials[i].name + '/' + specials[i].description;
        }
        chatPalette.innerText = chatText;

        charElem.appendChild(chatPalette);

        // XML化してファイルにしてダウンロード
        oSerializer = new XMLSerializer();
        sXML = oSerializer.serializeToString(charElem);
        sXML = sXML.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,'');
        sXML = sXML.replace(/<br \/>/g,'\n');
        sXML = sXML.replace(/currentvalue/g,'currentValue');

        blob = new Blob([sXML]);
        url = window.URL;
        bloburl = url.createObjectURL(blob);

        a = document.createElement('a');
        a.download = 'data.xml';
        a.href = bloburl;
        a.click();

    }
    catch(e) {
        window.alert('失敗しました'+e);
    }
})());