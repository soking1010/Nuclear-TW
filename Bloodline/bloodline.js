function generateBloodCode(fatherDom, motherDom, specialEvent) {
    // 基於父母基因和特殊事件生成源血編碼
    const genePrefix = fatherDom.substring(0, 2).toUpperCase();
    const geneMiddle = motherDom.substring(0, 2).toUpperCase();
    
    // 生成隨機數字
    const getRandomDigit = () => Math.floor(Math.random() * 10).toString();
    const randomNum = Array(4).fill(0).map(getRandomDigit).join('');
    
    // 根據特殊事件調整編碼
    let eventModifier = specialEvent === 'none' ? 'AA' : specialEvent.substring(0, 2).toUpperCase();
    
    return `${genePrefix}${geneMiddle}${randomNum}${eventModifier}`;
}

function generateResult() {
    const result = document.getElementById('result');
    const analysisResult = document.getElementById('analysis-result');
    result.style.display = 'block';
    
    // 清空之前的結果
    analysisResult.innerHTML = '';

    // 獲取所有選擇的值
    const fatherDominant = document.getElementById('father-dominant').value;
    const fatherRecessive1 = document.getElementById('father-recessive-1').value;
    const fatherRecessive2 = document.getElementById('father-recessive-2').value;
    const motherDominant = document.getElementById('mother-dominant').value;
    const motherRecessive1 = document.getElementById('mother-recessive-1').value;
    const motherRecessive2 = document.getElementById('mother-recessive-2').value;
    const birthLocation = document.getElementById('birth-location').value;
    const radiationLevel = document.getElementById('radiation-level').value;
    const psionicField = document.getElementById('psionic-field').value;
    const specialEvent = document.getElementById('special-event').value;

    // 生成劇情和分析結果
    const story = generateStory(fatherDominant, motherDominant, [fatherRecessive1, fatherRecessive2], [motherRecessive1, motherRecessive2], birthLocation, radiationLevel, psionicField, specialEvent);
    const traits = generateTraits(fatherDominant, motherDominant, [fatherRecessive1, fatherRecessive2], [motherRecessive1, motherRecessive2]);
    const environment = determineEnvironmentAdaptation(birthLocation, radiationLevel, psionicField);
    const bloodCode = generateBloodCode(fatherDominant, motherDominant, specialEvent);

    // 添加樣式以保持換行和格式
    analysisResult.style.whiteSpace = 'pre-wrap';
    
    // 模擬分析過程
    const analysisSteps = [
        '\n═══════ 基因分析系統初始化序列 ═══════\n\n',
        '  正在連接林氏家族基因庫...          \n',
        '  正在載入基因分析模組...            \n\n',
        '═════════════════════════════════════\n\n',
        '  [系統] 啟動基因分析系統...     ✓\n',
        '  [連接] 基因庫連接完成...       ✓\n',
        '  [分析] 父系基因組合...         ✓\n',
        '  [分析] 母系基因組合...         ✓\n',
        '  [運算] 基因優勢度計算...       ✓\n',
        '  [環境] 適應性評估...           ✓\n',
        '  [確認] 子代命名程序...         ✓\n\n',
        '═══════════ 分析報告 ═══════════\n\n',
        '【基因來源】\n\n',
        '  ◆ 父系基因：林振源\n',
        '    └─ 基因庫編號：LIN-2187\n\n',
        '  ◆ 母系基因：林月娥\n',
        '    └─ 基因庫編號：LIN-3721\n\n',
        '  ◆ 子代命名：林德明\n',
        '    └─ 基因組合碼：LIN-8964\n',
        '    └─ 源血編碼：' + bloodCode + '\n\n',
        '【出生劇情】\n\n' + story + '\n\n',
        '【子代特徵】\n\n' + traits + '\n\n',
        '【環境適應】\n\n' + environment + '\n\n',
        '═══════════ 分析完成 ═══════════\n\n',
        '     基因分析報告生成完成      \n',
        '     謹祝子代前程似錦          \n\n'
    ];

    let i = 0;
    function typeNextStep() {
        if (i < analysisSteps.length) {
            analysisResult.innerHTML += analysisSteps[i] + '\n';
            i++;
            setTimeout(typeNextStep, 1000);
        }
    }

    typeNextStep();
}

function generateStory(fatherDom, motherDom, fatherRecs, motherRecs, location, radiation, psionic, event) {
    const geneEffects = {
        'heart_fragile': '心跳微弱且不穩',
        'lung_strong': '呼吸平穩有力',
        'radiation_resist': '皮膚泛著淡淡的螢光',
        'immune_abnormal': '免疫系統異常活躍',
        'night_vision': '瞳孔在黑暗中泛著微光',
        'muscle_mutation': '肌肉線條異常發達',
        'sin_gluttony': '新生兒的食慾驚人',
        'sin_greed': '對周圍事物表現出強烈興趣',
        'sin_wrath': '脾氣暴躁易怒',
        'meridian_du': '背脊泛著陽氣光芒',
        'meridian_ren': '散發著溫和的治癒氣息',
        'meridian_lung': '呼吸間能淨化周圍空氣',
        'meridian_heart': '能感知他人情緒',
        'organ_heart': '情緒波動容易影響周圍',
        'organ_liver': '眼神中帶著憤怒的火花',
        'organ_spleen': '體弱但心思細膩',
        'organ_lung': '容易感知靈異氣息'
    };

    const locationDesc = {
        'taipei': '在大台北廢墟的地下避難所中',
        'taichung': '在中部輻射區的醫療中心裡',
        'kaohsiung': '在南方科技城的基因實驗室中',
        'east': '在東部靈能聖地的修行道場內'
    };

    const radiationEffect = {
        'low': '微弱的輻射反應',
        'medium': '明顯的基因突變跡象',
        'high': '強烈的輻射能量波動'
    };

    const psionicEffect = {
        'weak': '些微的靈能波動',
        'moderate': '清晰的靈能共鳴',
        'strong': '強大的靈能爆發'
    };

    const specialEventEffect = {
        'none': '',
        'three_corpse': '突然間，三道詭異的氣息纏繞在嬰兒身上，似乎預示著三屍神的降臨',
        'soul_split': '嬰兒的意識似乎分裂成多個部分，每個部分都展現出不同的氣質',
        'corpse_dog': '嬰兒對死亡氣息展現出異常的敏感，彷彿能看見不該存在的東西',
        'dark_bird': '嬰兒的眼睛中閃爍著奇特的光芒，似乎能看透人心',
        'swallow_thief': '嬰兒散發出一種奇特的氣場，彷彿能吸收他人的能力',
        'blood_ritual': '源血的力量在嬰兒體內流轉，產生出獨特的混合體質',
        'spirit_cleanse': '一道淨化之光籠罩著嬰兒，驅散了部分不穩定的基因'
    };

    const fatherEffect = geneEffects[fatherDom] || '';
    const motherEffect = geneEffects[motherDom] || '';
    const fatherRecEffects = fatherRecs.map(gene => geneEffects[gene] || '').filter(effect => effect !== '');
    const motherRecEffects = motherRecs.map(gene => geneEffects[gene] || '').filter(effect => effect !== '');

    let story = `${locationDesc[location]}，一個特殊的生命誕生了。\n\n`;
    story += `醫生們檢測到${radiationEffect[radiation]}，同時感受到${psionicEffect[psionic]}。\n\n`;
    story += `這個孩子承襲了父親的${fatherEffect}，以及母親的${motherEffect}。\n`;
    
    if (fatherRecEffects.length > 0 || motherRecEffects.length > 0) {
        story += '深層基因檢測還發現，孩子潛藏著';
        if (fatherRecEffects.length > 0) {
            story += `來自父系的${fatherRecEffects.join('和')}，`;
        }
        if (motherRecEffects.length > 0) {
            story += `以及來自母系的${motherRecEffects.join('和')}`;
        }
        story += '的特質。\n';
    }

    story += `\n這獨特的基因組合，預示著不凡的命運。`;
    
    if (event !== 'none') {
        story += `\n\n${specialEventEffect[event]}`;
    }

    return story;
}

function generateTraits(fatherDom, motherDom, fatherRecs, motherRecs, specialEvent = 'none') {
    const dominantDesc = determineTraits(fatherDom, motherDom);
    const fatherRecessiveDesc = determineTraits(...fatherRecs);
    const motherRecessiveDesc = determineTraits(...motherRecs);
    const recessiveDesc = `${fatherRecessiveDesc}，${motherRecessiveDesc}`;
    
    const personalityTraits = [
        '展現出超凡的適應能力',
        '對環境變化有著敏銳的感知',
        '蘊含著潛在的進化可能'
    ];

    const specialGeneDesc = specialEvent !== 'none' ? getSpecialGeneDesc(specialEvent) : '無特殊基因';

    return `基因特徵：${dominantDesc}\n潛在特質：${recessiveDesc}\n特殊基因：${specialGeneDesc}\n性格傾向：${personalityTraits.join('，')}`;
}

function determineTraits(gene1, gene2) {
    // 特質決定邏輯
    if (gene1 === gene2) {
        return `強化的${getTraitName(gene1)}，${getTraitEffect(gene1)}`;
    } else {
        return `${getTraitName(gene1)}和${getTraitName(gene2)}的混合表現，${getTraitEffect(gene1)}與${getTraitEffect(gene2)}相互影響`;
    }
}

function getTraitName(trait) {
    const traits = {
        // 器官穩定度
        'heart_fragile': '心脈失衡',
        'lung_strong': '肺氣充盈',
        // 體質特異性
        'radiation_resist': '輻射抗體',
        'immune_abnormal': '免疫異化',
        // 疾病易感性
        'mental_fragile': '神智脆弱',
        'chronic_carrier': '慢性病體',
        // 突變能力
        'night_vision': '夜目',
        'muscle_mutation': '筋骨異變',
        // 七宗罪因子
        'sin_gluttony': '暴食之相',
        'sin_greed': '貪婪之相',
        'sin_wrath': '憤怒之相',
        'sin_pride': '傲慢之相',
        'sin_envy': '嫉妒之相',
        'sin_sloth': '懈怠之相',
        'sin_lust': '色慾之相',
        // 六慾異化
        'desire_food': '食慾異化',
        'desire_sleep': '嗜睡異化',
        'desire_lust': '情慾異化',
        'desire_greed': '貪婪異化',
        'desire_comfort': '安逸異化',
        'desire_power': '權慾異化',
        // 情緒突變
        'emotion_anger': '怒火中燒',
        'emotion_sorrow': '悲念纏身',
        // 經脈異化
        'meridian_du': '督脈異化',
        'meridian_ren': '任脈異化',
        'meridian_lung': '肺經靈化',
        'meridian_heart': '心包異動',
        'meridian_chong': '衝脈共鳴',
        'meridian_dai': '帶脈失衡',
        'meridian_yin': '陰維失調',
        'meridian_yang': '陽維紊亂',
        'meridian_yin_heel': '陰蹻覺醒',
        'meridian_yang_heel': '陽蹻激發',
        // 臟腑異變
        'organ_heart': '心火偏盛',
        'organ_liver': '肝氣逆亂',
        'organ_spleen': '脾虛失運',
        'organ_lung': '肺氣虛寒',
        'organ_kidney': '腎水枯竭',
        'organ_gallbladder': '膽氣不足',
        'organ_stomach': '胃氣虛弱',
        'organ_small_intestine': '小腸失調'
    };
    return traits[trait] || trait;
}

function getTraitEffect(trait) {
    const effects = {
        // 器官穩定度
        'heart_fragile': '心脈不穩，易有暴斃之憂',
        'lung_strong': '氣息綿長，耐力過人',
        // 體質特異性
        'radiation_resist': '輻射難侵，生存力強',
        'immune_abnormal': '百毒不侵，異於常人',
        // 六慾異化
        'desire_food': '對食物有異常的渴求，可以吞食任何物質',
        'desire_sleep': '嗜睡成性，經常陷入深層睡眠',
        'desire_lust': '情感波動劇烈，難以自持',
        'desire_greed': '對資源有強烈的渴望，貪婪無度',
        'desire_comfort': '追求安逸，但效率驚人',
        'desire_power': '渴望掌控一切，易失去理智',
        // 疾病易感性
        'mental_fragile': '心神不寧，易受邪祟影響',
        'chronic_carrier': '百病纏身，需常年調養',
        // 突變能力
        'night_vision': '夜行如晝，視物無礙',
        'muscle_mutation': '力大無窮，形體異常',
        // 七宗罪因子
        'sin_gluttony': '食量驚人，恢復迅速',
        'sin_greed': '貪得無厭，善於搜刮',
        'sin_wrath': '怒火攻心，戰力驚人',
        'sin_pride': '傲視群雄，難以親近',
        'sin_envy': '心生嫉恨，難以和睦',
        'sin_sloth': '懶散怠惰，回復超群',
        'sin_lust': '媚態天成，易生情愫',
        // 情緒突變
        'emotion_anger': '易怒易狂，難以自持',
        'emotion_sorrow': '悲傷纏身，預知死兆',
        // 經脈異化
        'meridian_du': '陽氣充盈，戰力超群',
        'meridian_ren': '生機旺盛，恢復迅速',
        'meridian_lung': '氣清體正，百毒不侵',
        'meridian_heart': '心靈敏感，洞察人心',
        'meridian_chong': '經脈暴走，力量失控',
        'meridian_dai': '氣息紊亂，難以控制',
        'meridian_yin': '陰氣外洩，體質虛弱',
        'meridian_yang': '陽氣外散，精力耗損',
        'meridian_yin_heel': '夜間活躍，靈感敏銳',
        'meridian_yang_heel': '日間強盛，體能充沛',
        // 臟腑異變
        'organ_heart': '情緒波動，靈覺敏銳',
        'organ_liver': '易怒易狂，氣血上湧',
        'organ_spleen': '體虛多思，洞察入微',
        'organ_lung': '易感風寒，通靈有術',
        'organ_kidney': '精氣不足，靈感湧現',
        'organ_gallbladder': '膽怯心驚，直覺準確',
        'organ_stomach': '飲食失調，需特殊食材',
        'organ_small_intestine': '吸收異常，可消化異物',
        // 六慾異化
        'desire_food': '食慾異常，可吞食任何物質',
        'desire_sleep': '嗜睡症狀，不分晝夜',
        'desire_lust': '情感糾葛，難以自持',
        'desire_greed': '資源渴望，貪婪無度',
        'desire_comfort': '安逸成性，效率加倍',
        'desire_power': '控制慾強，易失理智'
    };
    return effects[trait] || trait;
}

function getSpecialGeneDesc(event) {
    const specialGenes = {
        'three_corpse': '三屍神基因，具有多重人格傾向',
        'soul_split': '靈魂分裂基因，意識可能產生分化',
        'corpse_dog': '死氣感知基因，對死亡能量敏感',
        'dark_bird': '暗鳥基因，具有洞察人心的能力',
        'swallow_thief': '吞能基因，可吸收他人特質',
        'blood_ritual': '混血基因，體質呈現多重特性',
        'spirit_cleanse': '淨化基因，可抑制不穩定因子'
    };
    return specialGenes[event] || '未知特殊基因';
}

function determineEnvironmentAdaptation(location, radiation, psionic) {
    const adaptations = [];

    // 根據出生地區決定基本適應能力
    switch(location) {
        case 'taipei':
            adaptations.push('廢墟生存能力極強');
            adaptations.push('對地下環境有極佳適應性');
            break;
        case 'taichung':
            adaptations.push('輻射抗性較高');
            adaptations.push('醫療資源需求增加');
            break;
        case 'kaohsiung':
            adaptations.push('科技親和力強');
            adaptations.push('基因穩定性高');
            break;
        case 'east':
            adaptations.push('靈能天賦出眾');
            adaptations.push('修行資質優異');
            break;
    }

    // 根據輻射程度添加特殊適應
    switch(radiation) {
        case 'low':
            adaptations.push('基因穩定性良好');
            break;
        case 'medium':
            adaptations.push('產生適應性突變');
            break;
        case 'high':
            adaptations.push('高度基因不穩定');
            adaptations.push('具有進一步突變可能');
            break;
    }

    // 根據靈能場強度添加特殊能力
    switch(psionic) {
        case 'weak':
            adaptations.push('具備基礎靈能感知');
            break;
        case 'moderate':
            adaptations.push('靈能力量逐漸覺醒');
            break;
        case 'strong':
            adaptations.push('強大靈能潛力');
            adaptations.push('可能發展出特殊能力');
            break;
    }

    return adaptations.join('\n');
}