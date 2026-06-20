const labels = {
  gender: { male: "男", female: "女" },
  originClass: {
    upper: "上层/精英教育",
    middle: "中产",
    working: "工人阶级",
    care: "福利院成长",
    rural: "乡村"
  },
  maritalStatus: {
    single: "单身",
    partnered: "伴侣关系",
    married: "已婚",
    divorced: "离异",
    remarried: "再婚",
    widowed: "丧偶",
    unknown: "未知"
  },
  education: {
    primary: "小学",
    secondary: "中学",
    grammar: "文法学校",
    boarding: "寄宿学校",
    university: "大学",
    postgraduate: "研究生",
    none: "无",
    unknown: "未知"
  },
  jobCategory: {
    student: "学生",
    academic: "学者",
    law: "法律",
    driver: "出租车司机",
    librarian: "图书馆员",
    administrator: "行政",
    teacher: "教师",
    counselor: "咨询/照护",
    musician: "音乐人",
    civil_service: "公务/公共部门",
    trades: "技工",
    homemaker: "家庭照护",
    politics: "地方政治",
    jockey: "骑师/赛马",
    retired: "退休",
    unknown: "未知"
  },
  lifeSatisfaction: {
    high: "高",
    medium: "中",
    low: "低",
    unknown: "未知"
  }
};

// 数值型轨迹指标：用于折线图
const numericMetrics = {
  lifeSatisfactionScore: { label: "生活满意度", min: 0, max: 5, unit: "/5" },
  childrenCount: { label: "子女数量", min: 0, max: 8, unit: "个" }
};

// 类别型轨迹指标：用于徽章时间轴
const categoricalMetrics = {
  maritalStatus: { label: "婚姻状况", palette: {
    single: "#5b8def",
    partnered: "#9b87f5",
    married: "#2f855a",
    divorced: "#b7791f",
    remarried: "#caa23d",
    widowed: "#7e5fb1",
    unknown: "#9aa0a6"
  } },
  education: { label: "教育阶段", palette: {
    primary: "#5b8def",
    secondary: "#3b9ddd",
    grammar: "#caa23d",
    boarding: "#9b87f5",
    university: "#2e6f73",
    postgraduate: "#205f63",
    none: "#9aa0a6",
    unknown: "#9aa0a6"
  } },
  jobCategory: { label: "工作类别", palette: {
    student: "#5b8def",
    academic: "#2e6f73",
    law: "#205f63",
    driver: "#b7791f",
    librarian: "#3b9ddd",
    administrator: "#9b87f5",
    teacher: "#caa23d",
    counselor: "#7e5fb1",
    musician: "#b94e35",
    civil_service: "#205f63",
    trades: "#b7791f",
    homemaker: "#caa23d",
    politics: "#9b87f5",
    jockey: "#b94e35",
    retired: "#9aa0a6",
    unknown: "#9aa0a6"
  } },
  residence: { label: "居住地", palette: {} }
};

// 年龄感知默认值：用于没有 override 时避免成年人字段泄露到童年
const ageDefaults = (age) => {
  if (age <= 14) {
    return {
      education: age === 7 ? "primary" : "secondary",
      educationText: age === 7 ? "小学" : "中学",
      familyStatus: "with_parents",
      maritalStatus: "single",
      childrenCount: 0,
      jobCategory: "student",
      jobText: age === 7 ? "儿童" : "学生"
    };
  }
  if (age === 21) {
    return {
      education: "university",
      educationText: "大学",
      familyStatus: "with_parents",
      maritalStatus: "single",
      childrenCount: 0,
      jobCategory: "student",
      jobText: "学生/刚工作"
    };
  }
  return {};
};

const sourceUrl = "https://www.cbsnews.com/pictures/the-up-children-then-and-now/";
const photos = {
  nick: "https://assets3.cbsnewsstatic.com/hub/i/r/2013/01/04/e1113ba6-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/038b16be2b32bfea0561f2bcd15675e3/UP_Nick_7_42.jpg",
  tony: "https://assets3.cbsnewsstatic.com/hub/i/r/2013/01/04/e112f667-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/08c783e0f465dc1fd45c72a7653c2b27/UP_Tony_7_49.jpg",
  suzy: "https://assets2.cbsnewsstatic.com/hub/i/r/2013/01/04/e1140df3-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/cffb1ead9710531623398223c995200c/UP_Suzy_7_49.jpg",
  peter: "https://assets3.cbsnewsstatic.com/hub/i/r/2013/01/05/e1150e73-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/d41c11231e1a7cbd26b3b8357d2ef7bd/UP_Peter_14_56.jpg",
  andrew: "https://assets3.cbsnewsstatic.com/hub/i/r/2013/01/04/e115b0c0-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/682a98f2a206e56d13fb1c5f5fc9b984/UP_Andrew_7_49.jpg",
  girls: "https://assets2.cbsnewsstatic.com/hub/i/r/2013/01/04/e116898c-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x400/d9069d24802a253f0e1664fb7400b951/UP_JackieSueLynn_49.jpg",
  symon: "https://assets1.cbsnewsstatic.com/hub/i/r/2013/01/04/e1174f10-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/798fa3a452c0ecbfc9f993bda35c8031/UP_Symon_7_49.jpg",
  paul: "https://assets2.cbsnewsstatic.com/hub/i/r/2013/01/04/e1181f56-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/ff7491e7ba65a543458689ca3838f885/UP_Paul_7_56.jpg",
  john: "https://assets2.cbsnewsstatic.com/hub/i/r/2013/01/05/e1191a0a-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/0221cf3e2222e5ee893b3486fed97aff/UP_John_7_56.jpg",
  bruce: "https://assets1.cbsnewsstatic.com/hub/i/r/2013/01/05/e119e56f-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x465/9ee78c2e39714c630ecc28f01f58f2b9/Up_Bruce_7_56.jpg",
  neil: "https://assets1.cbsnewsstatic.com/hub/i/r/2013/01/05/e11aba77-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x644/c54b2550b2209367dcfa7d99815fb125/Up_Neil_montage.jpg",
  group21: "https://assets3.cbsnewsstatic.com/hub/i/r/2013/01/04/e11b96d0-3615-11e3-8ce8-047d7b15b92e/thumbnail/620x403/970bce86b55cf85a7fe128786068d8a4/21Up.jpg"
};

const makeStages = (base, events) => [7, 14, 21, 28, 35, 42, 49, 56, 63].map((age) => {
  const defaults = ageDefaults(age);
  const override = events[age] || {};
  return {
    age,
    year: 1957 + age,
    appeared: override.appeared ?? true,
    residence: override.residence ?? base.residence ?? "未知",
    education: override.education ?? defaults.education ?? base.education ?? "unknown",
    educationText: override.educationText ?? defaults.educationText ?? base.educationText ?? "未知",
    familyStatus: override.familyStatus ?? defaults.familyStatus ?? base.familyStatus ?? "unknown",
    maritalStatus: override.maritalStatus ?? defaults.maritalStatus ?? base.maritalStatus ?? "unknown",
    childrenCount: override.childrenCount ?? defaults.childrenCount ?? base.childrenCount ?? 0,
    jobCategory: override.jobCategory ?? defaults.jobCategory ?? base.jobCategory ?? "unknown",
    jobText: override.jobText ?? defaults.jobText ?? base.jobText ?? "未知",
    lifeSatisfaction: override.lifeSatisfaction ?? base.lifeSatisfaction ?? "unknown",
    lifeSatisfactionScore: override.lifeSatisfactionScore ?? base.lifeSatisfactionScore ?? 0,
    notes: override.notes ?? "",
    photo: override.photo ?? base.photo,
    sourceUrl
  };
});

const people = [
  {
    id: "tony",
    name: "Tony Walker",
    cnName: "托尼·沃克",
    gender: "male",
    originClass: "working",
    photo: photos.tony,
    summary: "东伦敦长大，童年梦想成为骑师，后来长期做出租车司机并尝试表演和地产。",
    stages: makeStages(
      { residence: "伦敦东区", education: "secondary", educationText: "普通中学", familyStatus: "大家庭", maritalStatus: "married", childrenCount: 3, jobCategory: "driver", jobText: "出租车司机", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.tony, notes: "生活务实，家庭关系和经济压力交织。" },
      {
        7: { residence: "伦敦东区", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "儿童", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "想成为赛马骑师，性格外向。" },
        14: { residence: "伦敦东区", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在东区中学就读，仍梦想成为骑师。" },
        21: { residence: "伦敦东区", education: "secondary", educationText: "中学", familyStatus: "已婚育儿", maritalStatus: "married", childrenCount: 1, jobCategory: "driver", jobText: "出租车司机", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "成为骑师后转向出租车行业，已经成家。" },
        28: { maritalStatus: "married", childrenCount: 1, jobCategory: "driver", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "出租车工作稳定，组建家庭。" },
        35: { maritalStatus: "married", childrenCount: 2, jobCategory: "driver", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "尝试做演员，仍以开车为主业。" },
        42: { maritalStatus: "married", childrenCount: 3, lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "婚姻经历波折，但仍维持家庭。" },
        49: { maritalStatus: "married", childrenCount: 3, jobCategory: "driver", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "身体健康，家庭幸福，尝试地产投资。" },
        56: { childrenCount: 3, lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "经济计划受挫，仍重视家庭纽带。" },
        63: { maritalStatus: "married", jobCategory: "retired", jobText: "半退休/家庭生活", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "尝试地产失败，回归家庭。" }
      }
    )
  },
  {
    id: "nick",
    name: "Nicholas Hitchon",
    cnName: "尼克·希钦",
    gender: "male",
    originClass: "rural",
    photo: photos.nick,
    summary: "约克郡农家孩子，后来赴美成为大学教授，人生轨迹跨越乡村与学术世界。",
    stages: makeStages(
      { residence: "美国威斯康星", education: "postgraduate", educationText: "物理/工程相关高等教育", familyStatus: "有子女", maritalStatus: "remarried", childrenCount: 1, jobCategory: "academic", jobText: "大学教授", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.nick, notes: "对拍摄保持矛盾态度，但持续参与。" },
      {
        7: { residence: "约克郡乡村", education: "primary", educationText: "乡村小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "对月球和科学感兴趣。" },
        14: { residence: "约克郡乡村", education: "boarding", educationText: "寄宿学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "就读寄宿学校，对自然科学保持好奇。" },
        21: { residence: "牛津", education: "university", educationText: "牛津大学物理", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "继续深造，也表达了对被追问的不适。" },
        28: { residence: "美国", education: "postgraduate", educationText: "美国研究生", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "博士研究生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "赴美攻读博士学位。" },
        35: { residence: "美国威斯康星", maritalStatus: "married", childrenCount: 0, jobCategory: "academic", jobText: "助理教授", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在大学任教，组建家庭。" },
        42: { residence: "美国威斯康星", maritalStatus: "married", childrenCount: 1, jobCategory: "academic", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在大学稳定任教。" },
        49: { residence: "美国威斯康星", maritalStatus: "remarried", childrenCount: 1, jobCategory: "academic", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "离婚后再婚，继续学术生涯。" },
        56: { residence: "美国威斯康星", maritalStatus: "remarried", childrenCount: 1, jobCategory: "academic", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "持续担任教授。" },
        63: { jobCategory: "academic", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "晚年面对疾病，仍反思系列的意义。" }
      }
    )
  },
  {
    id: "neil",
    name: "Neil Hughes",
    cnName: "尼尔·休斯",
    gender: "male",
    originClass: "middle",
    photo: photos.neil,
    summary: "经历大学中断、漂泊和心理困境，后在朋友帮助下逐渐稳定，并参与地方政治和教会工作。",
    stages: makeStages(
      { residence: "英格兰西北", education: "university", educationText: "阿伯丁大学中断", familyStatus: "独居", maritalStatus: "single", childrenCount: 0, jobCategory: "politics", jobText: "地方议员/社区工作", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.neil, notes: "生命轨迹起伏最大的人物之一。" },
      {
        7: { residence: "利物浦", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "童年活泼，对未来有清晰想象。" },
        14: { residence: "利物浦", education: "boarding", educationText: "Strathearn 寄宿学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在寄宿学校感到压抑。" },
        21: { residence: "伦敦", education: "university", educationText: "阿伯丁大学辍学", maritalStatus: "single", childrenCount: 0, jobCategory: "unknown", jobText: "无业", lifeSatisfaction: "low", lifeSatisfactionScore: 1, notes: "大学中断，居住不稳定并承受心理压力。" },
        28: { residence: "苏格兰高地", education: "university", educationText: "大学辍学", maritalStatus: "single", childrenCount: 0, jobCategory: "unknown", jobText: "流浪", lifeSatisfaction: "low", lifeSatisfactionScore: 1, notes: "漂泊、孤独，状态低落。" },
        35: { residence: "伦敦", education: "university", educationText: "大学辍学", maritalStatus: "single", childrenCount: 0, jobCategory: "civil_service", jobText: "议会助理", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "在伦敦租住议会公寓，逐渐稳定。" },
        42: { residence: "伦敦", jobCategory: "politics", jobText: "地方议员", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在 Bruce 帮助下生活逐步恢复秩序。" },
        49: { residence: "英格兰西北", jobCategory: "politics", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "从事地方政治和教会相关工作。" },
        56: { jobCategory: "politics", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "继续参与地方议会和教会工作。" },
        63: { lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "生活趋于稳定，但仍保持单身。" }
      }
    )
  },
  {
    id: "bruce",
    name: "Bruce Balden",
    cnName: "布鲁斯·鲍尔登",
    gender: "male",
    originClass: "middle",
    photo: photos.bruce,
    summary: "童年想去非洲传教，后来成为教师，曾在孟加拉和伦敦东区任教。",
    stages: makeStages(
      { residence: "英格兰", education: "university", educationText: "牛津大学", familyStatus: "有子女", maritalStatus: "married", childrenCount: 2, jobCategory: "teacher", jobText: "教师", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.bruce, notes: "职业与童年理想保持了某种连续性。" },
      {
        7: { education: "boarding", educationText: "寄宿学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "表达过去非洲传教的愿望。" },
        14: { education: "boarding", educationText: "寄宿学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在寄宿学校就读，关怀社会议题。" },
        21: { residence: "牛津", education: "university", educationText: "牛津大学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在牛津大学就读，仍保持服务社会的想法。" },
        28: { residence: "孟加拉", education: "university", educationText: "牛津大学", maritalStatus: "single", childrenCount: 0, jobCategory: "teacher", jobText: "海外教师", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在孟加拉乡村教授数学，尚未结婚。" },
        35: { maritalStatus: "single", childrenCount: 0, residence: "孟加拉/伦敦", jobCategory: "teacher", jobText: "教师", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "海外和伦敦教学经历塑造了他的价值观。" },
        42: { maritalStatus: "married", childrenCount: 0, lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "与同为教师的伴侣结婚。" },
        49: { residence: "英格兰", maritalStatus: "married", childrenCount: 2, jobCategory: "teacher", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在伦敦东区任教，育有两个孩子。" },
        56: { residence: "英格兰", maritalStatus: "married", childrenCount: 2, jobCategory: "teacher", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "继续教学，孩子逐渐长大。" },
        63: { residence: "英格兰", maritalStatus: "divorced", childrenCount: 2, jobCategory: "teacher", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "婚姻结束，但仍坚持教学。" }
      }
    )
  },
  {
    id: "andrew",
    name: "Andrew Brackfield",
    cnName: "安德鲁·布拉克菲尔德",
    gender: "male",
    originClass: "upper",
    photo: photos.andrew,
    summary: "肯辛顿预备学校学生，后来读剑桥并成为律师事务所合伙人。",
    stages: makeStages(
      { residence: "伦敦", education: "university", educationText: "剑桥大学", familyStatus: "有子女", maritalStatus: "remarried", childrenCount: 3, jobCategory: "law", jobText: "律师/合伙人", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.andrew, notes: "职业路径稳定，阶层延续性明显。" },
      {
        7: { education: "primary", educationText: "肯辛顿预备学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "就读于肯辛顿预备学校，已显露精英倾向。" },
        14: { education: "boarding", educationText: "Charterhouse 公学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "进入寄宿公学，目标明确。" },
        21: { residence: "剑桥", education: "university", educationText: "剑桥大学法律", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在剑桥学习法律，目标律师事务所。" },
        28: { residence: "伦敦", education: "university", educationText: "剑桥大学", maritalStatus: "single", childrenCount: 0, jobCategory: "law", jobText: "见习律师", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "刚进入法律界，专注职业发展。" },
        35: { maritalStatus: "married", childrenCount: 1, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "完成合伙人晋升，结婚并育有子女。" },
        42: { residence: "伦敦", maritalStatus: "married", childrenCount: 2, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "律师事务所合伙人，生活优渥。" },
        49: { residence: "伦敦", maritalStatus: "married", childrenCount: 3, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "事业稳定，孩子渐长。" },
        56: { residence: "伦敦", maritalStatus: "divorced", childrenCount: 3, jobCategory: "law", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "经历婚变，但仍专注事业。" },
        63: { residence: "伦敦", maritalStatus: "remarried", childrenCount: 3, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "再婚，与新伴侣生活。" }
      }
    )
  },
  {
    id: "john",
    name: "John Brisby",
    cnName: "约翰·布里斯比",
    gender: "male",
    originClass: "upper",
    photo: photos.john,
    summary: "童年展现政治兴趣，后来成为大律师，并长期参与保加利亚相关慈善。",
    stages: makeStages(
      { residence: "伦敦", education: "university", educationText: "牛津大学", familyStatus: "夫妻家庭", maritalStatus: "married", childrenCount: 0, jobCategory: "law", jobText: "大律师", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.john, notes: "对影片塑造的阶层标签有明确反驳。" },
      {
        7: { education: "primary", educationText: "肯辛顿预备学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "早早表达从政兴趣。" },
        14: { education: "boarding", educationText: "Charterhouse 公学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在寄宿公学准备进入政界。" },
        21: { residence: "牛津", education: "university", educationText: "牛津大学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "就读牛津，活跃于辩论与政治社团。" },
        28: { residence: "伦敦", education: "university", educationText: "牛津大学", maritalStatus: "married", childrenCount: 0, jobCategory: "law", jobText: "见习大律师", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "法律界起步，建立家庭。" },
        35: { residence: "伦敦", education: "university", educationText: "牛津大学", maritalStatus: "married", childrenCount: 0, jobCategory: "law", jobText: "大律师", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "事业稳定，深度参与保加利亚慈善。" },
        42: { appeared: false, notes: "未参加该阶段拍摄。" },
        49: { appeared: true, maritalStatus: "divorced", childrenCount: 0, lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "回归系列，谈及家庭背景被误读。" },
        56: { residence: "伦敦", appeared: true, maritalStatus: "partnered", childrenCount: 0, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "继续从事法律及慈善。" },
        63: { residence: "伦敦", appeared: true, maritalStatus: "married", childrenCount: 0, jobCategory: "law", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "再婚并继续法律职业生涯。" }
      }
    )
  },
  {
    id: "charles",
    name: "Charles Furneaux",
    cnName: "查尔斯·弗诺",
    gender: "male",
    originClass: "upper",
    photo: photos.group21,
    summary: "肯辛顿预备学校三人组之一，成年后停止参与系列，后来从事电视制作。",
    stages: makeStages(
      { residence: "英国", education: "university", educationText: "高等教育", familyStatus: "未知", maritalStatus: "unknown", childrenCount: 0, jobCategory: "unknown", jobText: "电视制作相关", lifeSatisfaction: "unknown", lifeSatisfactionScore: 0, photo: photos.group21, notes: "28岁后不再持续参与，公开数据有限。" },
      {
        7: { education: "primary", educationText: "肯辛顿预备学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在预备学校读书，性格温和。" },
        14: { education: "boarding", educationText: "Charterhouse 公学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "进入寄宿公学。" },
        21: { residence: "英国", education: "university", educationText: "大学在读", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "就读大学，但后续退出系列。" },
        28: { residence: "英国", education: "university", maritalStatus: "unknown", childrenCount: 0, jobCategory: "unknown", jobText: "未知", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "最后一次正式参与。" },
        35: { appeared: false, notes: "未参与拍摄。" },
        42: { appeared: false, notes: "未参与拍摄。" },
        49: { appeared: false, notes: "未参与拍摄。" },
        56: { appeared: false, notes: "未参与拍摄。" },
        63: { appeared: false, notes: "未参与 63 Up 正片访谈。" }
      }
    )
  },
  {
    id: "suzy",
    name: "Suzy Lusk",
    cnName: "苏茜·拉斯克",
    gender: "female",
    originClass: "upper",
    photo: photos.suzy,
    summary: "出身富裕家庭，年轻时对婚姻怀疑，28岁前后结婚并长期维持家庭生活。",
    stages: makeStages(
      { residence: "英格兰", education: "secondary", educationText: "私校/中学", familyStatus: "有子女", maritalStatus: "married", childrenCount: 3, jobCategory: "counselor", jobText: "丧亲辅导", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.suzy, notes: "对摄制介入不适，但仍多次回归。" },
      {
        7: { residence: "英格兰", education: "primary", educationText: "寄宿小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "出身富裕家庭，性格内向。" },
        14: { residence: "英格兰", education: "boarding", educationText: "寄宿学校", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在寄宿学校就读。" },
        21: { residence: "英格兰", education: "secondary", educationText: "中学毕业", maritalStatus: "single", childrenCount: 0, jobCategory: "unknown", jobText: "无业/间隔年", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "对婚姻表达怀疑和冷感。" },
        28: { residence: "英格兰", maritalStatus: "married", childrenCount: 1, jobCategory: "homemaker", jobText: "家庭主妇", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "结婚并育有第一个孩子。" },
        35: { residence: "英格兰", maritalStatus: "married", childrenCount: 2, jobCategory: "homemaker", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "婚姻遇到压力，状态起伏。" },
        42: { residence: "苏格兰", maritalStatus: "married", childrenCount: 3, jobCategory: "homemaker", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "搬至苏格兰生活。" },
        49: { residence: "苏格兰", maritalStatus: "married", childrenCount: 3, jobCategory: "counselor", jobText: "丧亲辅导志愿者", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "开始做志愿辅导，曾表示不想继续拍摄。" },
        56: { residence: "苏格兰", maritalStatus: "married", childrenCount: 3, jobCategory: "counselor", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "婚姻与生活趋于稳定。" },
        63: { residence: "苏格兰", maritalStatus: "married", childrenCount: 3, jobCategory: "counselor", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "持续参与丧亲辅导。" }
      }
    )
  },
  {
    id: "jackie",
    name: "Jackie Bassett",
    cnName: "杰姬·巴塞特",
    gender: "female",
    originClass: "working",
    photo: photos.girls,
    summary: "伦敦工人阶级社区成长，成年后经历离异、育儿和健康挑战。",
    stages: makeStages(
      { residence: "苏格兰", education: "secondary", educationText: "普通中学", familyStatus: "子女/孙辈", maritalStatus: "divorced", childrenCount: 3, jobCategory: "homemaker", jobText: "家庭照护", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.girls, notes: "直率地回应纪录片对工人阶级女性的呈现。" },
      {
        7: { residence: "伦敦东区", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在伦敦东区成长。" },
        14: { residence: "伦敦东区", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在普通中学就读。" },
        21: { residence: "伦敦东区", education: "secondary", educationText: "中学毕业", familyStatus: "已婚", maritalStatus: "married", childrenCount: 0, jobCategory: "homemaker", jobText: "家庭主妇", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "19岁结婚，尚未生育。" },
        28: { residence: "伦敦", maritalStatus: "married", childrenCount: 0, jobCategory: "homemaker", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "婚姻出现裂痕。" },
        35: { residence: "伦敦", maritalStatus: "divorced", childrenCount: 1, jobCategory: "homemaker", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "离异后与短暂关系生下一子。" },
        42: { residence: "苏格兰", maritalStatus: "divorced", childrenCount: 3, jobCategory: "homemaker", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "残疾津贴维生，独力抚养三子于格拉斯哥议会公寓。" },
        49: { residence: "苏格兰", maritalStatus: "divorced", childrenCount: 3, jobCategory: "homemaker", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "风湿性关节炎恶化，伴侣 Ian 车祸去世，对拍摄表达强烈不满。" },
        56: { residence: "苏格兰", maritalStatus: "divorced", childrenCount: 3, lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "见证孙辈出生，也面对前夫去世。" },
        63: { residence: "苏格兰", maritalStatus: "divorced", childrenCount: 3, jobCategory: "homemaker", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "面临健康挑战，但家庭支持网络紧密。" }
      }
    )
  },
  {
    id: "lynn",
    name: "Lynn Johnson",
    cnName: "琳恩·约翰逊",
    gender: "female",
    originClass: "working",
    photo: photos.girls,
    summary: "童年说想在 Woolworths 工作，后来成为图书馆员，长期服务社区。",
    stages: makeStages(
      { residence: "伦敦", education: "secondary", educationText: "普通中学", familyStatus: "子女/孙辈", maritalStatus: "married", childrenCount: 2, jobCategory: "librarian", jobText: "图书馆员", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.girls, notes: "公共服务工作稳定，晚年遇到预算削减。" },
      {
        7: { residence: "伦敦东区", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "童年说想在 Woolworths 工作。" },
        14: { residence: "伦敦东区", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在普通中学就读。" },
        21: { residence: "伦敦", education: "secondary", educationText: "中学毕业", maritalStatus: "single", childrenCount: 0, jobCategory: "unknown", jobText: "无业/找工作", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "曾在 Woolworths 短暂工作。" },
        28: { residence: "伦敦", education: "secondary", maritalStatus: "married", childrenCount: 1, jobCategory: "homemaker", jobText: "家庭主妇", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "结婚并育有第一个孩子。" },
        35: { residence: "伦敦", education: "secondary", maritalStatus: "married", childrenCount: 2, jobCategory: "librarian", jobText: "图书馆员", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "进入图书馆系统工作。" },
        42: { residence: "伦敦", maritalStatus: "married", childrenCount: 2, jobCategory: "librarian", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "图书馆工作稳定。" },
        49: { residence: "伦敦", maritalStatus: "married", childrenCount: 2, jobCategory: "librarian", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "焦虑可能的失业，担忧女儿未读大学。" },
        56: { jobCategory: "librarian", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "因公共预算削减失去图书馆工作。" },
        63: { appeared: false, lifeSatisfaction: "unknown", lifeSatisfactionScore: 0, notes: "Lynn 于 2013 年去世，未出现在 63 Up 正片访谈中。" }
      }
    )
  },
  {
    id: "sue",
    name: "Sue Davis",
    cnName: "苏·戴维斯",
    gender: "female",
    originClass: "working",
    photo: photos.girls,
    summary: "伦敦东区成长，年轻时结婚并育有子女，后离异并在高校法学院行政部门工作。",
    stages: makeStages(
      { residence: "伦敦", education: "secondary", educationText: "普通中学", familyStatus: "有子女", maritalStatus: "partnered", childrenCount: 2, jobCategory: "administrator", jobText: "法学院行政", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.girls, notes: "中年后职业和亲密关系逐步稳定。" },
      {
        7: { residence: "伦敦东区", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在伦敦东区成长。" },
        14: { residence: "伦敦东区", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在普通中学就读。" },
        21: { residence: "伦敦", education: "secondary", educationText: "中学毕业", maritalStatus: "single", childrenCount: 0, jobCategory: "unknown", jobText: "工作/未知", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "单身工作，24岁后才结婚。" },
        28: { maritalStatus: "married", childrenCount: 2, jobCategory: "homemaker", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "抚育两个小孩，婚姻出现问题。" },
        35: { residence: "伦敦", maritalStatus: "divorced", childrenCount: 2, jobCategory: "administrator", jobText: "行政助理", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "离异后开始工作。" },
        42: { maritalStatus: "divorced", jobCategory: "administrator", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "独力抚养两名子女，兼职谋生，生活拮据。" },
        49: { residence: "伦敦", maritalStatus: "divorced", childrenCount: 2, jobCategory: "administrator", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "继续在高校行政部门工作。" },
        56: { maritalStatus: "partnered", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "订婚并继续在高校行政部门工作。" },
        63: { residence: "伦敦", maritalStatus: "married", childrenCount: 2, jobCategory: "administrator", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "再婚并继续行政工作。" }
      }
    )
  },
  {
    id: "symon",
    name: "Symon Basterfield",
    cnName: "赛蒙·巴斯特菲尔德",
    gender: "male",
    originClass: "care",
    photo: photos.symon,
    summary: "福利院成长，是第一部中唯一非白人参与者，成年后经历婚姻、再婚和寄养培训。",
    stages: makeStages(
      { residence: "伦敦", education: "secondary", educationText: "普通中学", familyStatus: "再婚家庭", maritalStatus: "remarried", childrenCount: 6, jobCategory: "trades", jobText: "叉车操作/寄养培训", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.symon, notes: "再婚后家庭生活更稳定。" },
      {
        7: { residence: "伦敦儿童之家", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在儿童之家生活，父亲缺席。" },
        14: { residence: "伦敦", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在普通中学就读。" },
        21: { residence: "伦敦", education: "secondary", educationText: "中学毕业", maritalStatus: "single", childrenCount: 0, jobCategory: "trades", jobText: "学徒", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "开始工作学徒。" },
        28: { residence: "伦敦", maritalStatus: "married", childrenCount: 5, jobCategory: "trades", jobText: "操作工", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "结婚并有五个孩子。" },
        35: { maritalStatus: "divorced", childrenCount: 5, jobCategory: "trades", jobText: "操作工", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "离婚后独自面对生活压力。" },
        42: { maritalStatus: "remarried", childrenCount: 6, jobCategory: "trades", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "再婚并育有一子，但与前妻子女关系疏远。" },
        49: { residence: "伦敦", maritalStatus: "remarried", childrenCount: 6, jobCategory: "trades", jobText: "叉车操作员", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "婚姻出现矛盾，两个大儿子不愿与他来往。" },
        56: { residence: "伦敦", maritalStatus: "remarried", childrenCount: 6, jobCategory: "counselor", jobText: "寄养培训", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "参与寄养培训，分享经验。" },
        63: { residence: "伦敦", maritalStatus: "remarried", childrenCount: 6, jobCategory: "counselor", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "继续从事社区工作。" }
      }
    )
  },
  {
    id: "paul",
    name: "Paul Kligerman",
    cnName: "保罗·克里格曼",
    gender: "male",
    originClass: "care",
    photo: photos.paul,
    summary: "儿童之家成长，少年时移民澳大利亚，后来做砖瓦匠并创业。",
    stages: makeStages(
      { residence: "澳大利亚", education: "secondary", educationText: "澳大利亚中学", familyStatus: "有子女/孙辈", maritalStatus: "married", childrenCount: 2, jobCategory: "trades", jobText: "砖瓦匠/老年中心工作", lifeSatisfaction: "high", lifeSatisfactionScore: 4, photo: photos.paul, notes: "移民改变了人生路径，家庭较稳定。" },
      {
        7: { residence: "伦敦儿童之家", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "low", lifeSatisfactionScore: 2, notes: "在儿童之家生活。" },
        14: { residence: "澳大利亚", education: "secondary", educationText: "澳大利亚中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "随收养家庭移民至澳大利亚。" },
        21: { residence: "澳大利亚", education: "secondary", educationText: "中学毕业", maritalStatus: "single", childrenCount: 0, jobCategory: "trades", jobText: "学徒", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在澳大利亚开始学砖瓦匠。" },
        28: { residence: "澳大利亚", education: "secondary", maritalStatus: "married", childrenCount: 1, jobCategory: "trades", jobText: "砖瓦匠", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "结婚并育有第一个孩子。" },
        35: { residence: "澳大利亚", maritalStatus: "married", childrenCount: 2, jobCategory: "trades", jobText: "砖瓦匠", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在澳大利亚组建稳定家庭。" },
        42: { residence: "澳大利亚", maritalStatus: "married", childrenCount: 2, jobCategory: "trades", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "家庭稳定，事业有成。" },
        49: { residence: "澳大利亚", maritalStatus: "married", childrenCount: 2, jobCategory: "trades", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在澳大利亚持续从事建筑。" },
        56: { jobCategory: "counselor", jobText: "老年中心工作", childrenCount: 2, lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "转至老年中心做照护工作。" },
        63: { residence: "澳大利亚", maritalStatus: "married", childrenCount: 2, jobCategory: "counselor", jobText: "老年中心", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "继续在社区做照护工作。" }
      }
    )
  },
  {
    id: "peter",
    name: "Peter Davies",
    cnName: "彼得·戴维斯",
    gender: "male",
    originClass: "middle",
    photo: photos.peter,
    summary: "利物浦长大，曾做教师，因政治评论退出多年，56岁回归并以乐队身份出现。",
    stages: makeStages(
      { residence: "利物浦", education: "university", educationText: "伦敦大学历史", familyStatus: "有子女", maritalStatus: "married", childrenCount: 2, jobCategory: "musician", jobText: "音乐人/公共部门经历", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, photo: photos.peter, notes: "长期缺席后回归，更多展示音乐生活。" },
      {
        7: { residence: "利物浦", education: "primary", educationText: "小学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "小学生", lifeSatisfaction: "high", lifeSatisfactionScore: 4, notes: "在利物浦成长。" },
        14: { residence: "利物浦", education: "secondary", educationText: "中学", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "中学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在利物浦的中学就读。" },
        21: { residence: "伦敦", education: "university", educationText: "伦敦大学历史", maritalStatus: "single", childrenCount: 0, jobCategory: "student", jobText: "大学生", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "在伦敦大学读历史。" },
        28: { residence: "利物浦", education: "university", educationText: "伦敦大学历史", maritalStatus: "single", childrenCount: 0, jobCategory: "teacher", jobText: "教师", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "成为教师，对撒切尔政府表达强烈不满。" },
        35: { appeared: false, lifeSatisfaction: "unknown", lifeSatisfactionScore: 0, notes: "因政治立场选择退出系列。" },
        42: { appeared: false, lifeSatisfaction: "unknown", lifeSatisfactionScore: 0, notes: "继续缺席。" },
        49: { appeared: false, lifeSatisfaction: "unknown", lifeSatisfactionScore: 0, notes: "继续缺席。" },
        56: { residence: "利物浦", appeared: true, maritalStatus: "married", childrenCount: 2, jobCategory: "musician", jobText: "乐队成员", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "以乡村乐队 The Good Intentions 成员身份回归。" },
        63: { residence: "利物浦", appeared: true, maritalStatus: "married", childrenCount: 2, jobCategory: "musician", lifeSatisfaction: "medium", lifeSatisfactionScore: 3, notes: "继续音乐生活。" }
      }
    )
  }
];

const state = {
  selectedPersonId: people[0].id,
  selectedStageAge: 63,
  detailMetric: "lifeSatisfactionScore"
};

const els = {
  nameFilter: document.querySelector("#nameFilter"),
  ageFilter: document.querySelector("#ageFilter"),
  maritalFilter: document.querySelector("#maritalFilter"),
  educationFilter: document.querySelector("#educationFilter"),
  satisfactionFilter: document.querySelector("#satisfactionFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  resultCount: document.querySelector("#resultCount"),
  cards: document.querySelector("#cards"),
  detail: document.querySelector("#personDetail"),
  groupBy: document.querySelector("#groupBy"),
  metric: document.querySelector("#metric"),
  compareAge: document.querySelector("#compareAge"),
  chart: document.querySelector("#chart")
};

const label = (type, value) => labels[type]?.[value] ?? value ?? "未知";
const stages = [...new Set(people.flatMap((person) => person.stages.map((stage) => stage.age)))].sort((a, b) => a - b);

function populateOptions() {
  stages.forEach((age) => {
    els.ageFilter.append(new Option(`${age} 岁`, String(age)));
    els.compareAge.append(new Option(`${age} 岁`, String(age)));
  });
  els.compareAge.value = "63";

  Object.entries(labels.maritalStatus).forEach(([value, text]) => els.maritalFilter.append(new Option(text, value)));
  Object.entries(labels.education).forEach(([value, text]) => els.educationFilter.append(new Option(text, value)));
  Object.entries(labels.lifeSatisfaction).forEach(([value, text]) => els.satisfactionFilter.append(new Option(text, value)));
}

function getStage(person, requestedAge = state.selectedStageAge) {
  if (requestedAge === "all") {
    return person.stages.findLast((stage) => stage.appeared) ?? person.stages.at(-1);
  }
  return person.stages.find((stage) => stage.age === Number(requestedAge)) ?? person.stages.at(-1);
}

function getFilteredPeople() {
  const query = els.nameFilter.value.trim().toLowerCase();
  const age = els.ageFilter.value;
  return people.filter((person) => {
    const stage = getStage(person, age);
    const nameHit = !query || person.name.toLowerCase().includes(query) || person.cnName.includes(query);
    const ageHit = age === "all" || person.stages.some((item) => item.age === Number(age) && item.appeared);
    const maritalHit = els.maritalFilter.value === "all" || stage.maritalStatus === els.maritalFilter.value;
    const educationHit = els.educationFilter.value === "all" || stage.education === els.educationFilter.value;
    const satisfactionHit = els.satisfactionFilter.value === "all" || stage.lifeSatisfaction === els.satisfactionFilter.value;
    return nameHit && ageHit && maritalHit && educationHit && satisfactionHit;
  });
}

function createImage(src, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";
  img.onerror = () => {
    img.remove();
  };
  return img;
}

function renderCards() {
  const filtered = getFilteredPeople();
  els.resultCount.textContent = String(filtered.length);
  els.cards.innerHTML = "";

  if (!filtered.length) {
    els.cards.innerHTML = `<div class="empty">没有匹配的人物。请放宽筛选条件。</div>`;
    return;
  }

  if (!filtered.some((person) => person.id === state.selectedPersonId)) {
    state.selectedPersonId = filtered[0].id;
  }

  filtered.forEach((person) => {
    const stage = getStage(person, els.ageFilter.value);
    const card = document.createElement("article");
    card.className = `card ${person.id === state.selectedPersonId ? "active" : ""}`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="portrait">
        <span class="age-badge">${stage.age} 岁</span>
        <span class="sat-badge sat-${stage.lifeSatisfaction}">满意度：${label("lifeSatisfaction", stage.lifeSatisfaction)}</span>
      </div>
      <div class="card-body">
        <div class="name-line">
          <h3>${person.cnName}</h3>
          <span>${person.name}</span>
        </div>
        <dl class="facts">
          <div class="fact"><dt>居住地</dt><dd>${stage.residence}</dd></div>
          <div class="fact"><dt>教育</dt><dd>${label("education", stage.education)} · ${stage.educationText}</dd></div>
          <div class="fact"><dt>家庭状况</dt><dd>${stage.familyStatus}</dd></div>
          <div class="fact"><dt>婚姻状况</dt><dd>${label("maritalStatus", stage.maritalStatus)}</dd></div>
          <div class="fact"><dt>工作</dt><dd>${label("jobCategory", stage.jobCategory)} · ${stage.jobText}</dd></div>
        </dl>
      </div>
    `;
    card.querySelector(".portrait").prepend(createImage(stage.photo || person.photo, `${person.cnName}照片`));
    card.addEventListener("click", () => {
      state.selectedPersonId = person.id;
      state.selectedStageAge = stage.age;
      render();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") card.click();
    });
    els.cards.append(card);
  });
}

function renderLineChart(person) {
  const metric = state.detailMetric;
  const appearedStages = person.stages.filter((stage) => stage.appeared);
  if (!appearedStages.length) return `<div class="empty">可视化数据不足</div>`;

  if (numericMetrics[metric]) {
    return renderNumericChart(person, appearedStages, metric);
  }
  if (categoricalMetrics[metric]) {
    return renderCategoricalChart(person, appearedStages, metric);
  }
  return `<div class="empty">暂不支持该指标</div>`;
}

function renderNumericChart(person, stages, metricKey) {
  const metric = numericMetrics[metricKey];
  const valid = stages.filter((stage) => Number(stage[metricKey]) > 0);
  if (valid.length < 2) {
    return renderCategoricalFallback(person, stages, metricKey, metric.label);
  }
  const width = 420;
  const height = 170;
  const pad = 28;
  const ages = stages.map((s) => s.age);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const yMin = metric.min;
  const yMax = metric.max;
  const x = (age) => pad + ((age - minAge) / Math.max(1, maxAge - minAge)) * (width - pad * 2);
  const y = (value) => height - pad - ((value - yMin) / (yMax - yMin)) * (height - pad * 2);
  const segments = [];
  const validPoints = [];
  valid.forEach((stage) => {
    const value = Number(stage[metricKey]);
    const cx = x(stage.age);
    const cy = y(value);
    validPoints.push({ cx, cy, age: stage.age, value });
  });
  for (let i = 1; i < validPoints.length; i++) {
    const a = validPoints[i - 1];
    const b = validPoints[i];
    segments.push(`<line x1="${a.cx}" y1="${a.cy}" x2="${b.cx}" y2="${b.cy}" stroke="#b94e35" stroke-width="2.5" stroke-linecap="round"></line>`);
  }
  const dots = validPoints.map((p) => `
    <g>
      <circle cx="${p.cx}" cy="${p.cy}" r="4" fill="#2e6f73" stroke="#fff" stroke-width="1.5"></circle>
      <text x="${p.cx}" y="${height - 6}" text-anchor="middle" font-size="10" fill="#666b70">${p.age}</text>
    </g>
  `).join("");
  const yLabel = (value, text) => `<text x="6" y="${y(value) + 3}" font-size="10" fill="#666b70">${text}</text>`;
  const yLines = [yMin, (yMin + yMax) / 2, yMax].map((v) => `<line x1="${pad}" y1="${y(v)}" x2="${width - pad}" y2="${y(v)}" stroke="#e0e4e1" stroke-dasharray="3 3"></line>`).join("");
  return `
    <svg class="line-chart" viewBox="0 0 ${width} ${height}" aria-label="${metric.label}随年龄变化">
      ${yLines}
      ${yLabel(yMax, metric.max + metric.unit)}
      ${yLabel((yMin + yMax) / 2, ((yMin + yMax) / 2).toFixed(1) + metric.unit)}
      ${yLabel(yMin, metric.min + metric.unit)}
      ${segments.join("")}
      ${dots}
    </svg>
  `;
}

function renderCategoricalChart(person, stages, metricKey) {
  return renderCategoricalFallback(person, stages, metricKey, categoricalMetrics[metricKey].label);
}

function renderCategoricalFallback(person, stages, metricKey, title) {
  const labelsForMetric = labels[metricKey] ?? categoricalMetrics[metricKey]?.palette ?? {};
  const items = stages.map((stage) => {
    const value = stage[metricKey];
    const colorKey = categoricalMetrics[metricKey]?.palette?.[value] ?? null;
    const palette = categoricalMetrics[metricKey]?.palette ?? null;
    const fallbackColor = palette && Object.keys(palette).length === 0 ? pickResidenceColor(value) : null;
    const color = colorKey ?? fallbackColor ?? "#9aa0a6";
    return { stage, color, text: labelsForMetric[value] ?? value ?? "未知" };
  });
  const width = 420;
  const height = 170;
  const pad = 28;
  const ages = stages.map((s) => s.age);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const x = (age) => pad + ((age - minAge) / Math.max(1, maxAge - minAge)) * (width - pad * 2);
  const baseline = height - 28;
  const tops = items.map((it) => Math.max(28, baseline - 60));
  return `
    <div class="cat-chart-label">${title}（按年龄段徽章）</div>
    <svg class="line-chart" viewBox="0 0 ${width} ${height}" aria-label="${title}按年龄段变化">
      <line x1="${pad}" y1="${baseline}" x2="${width - pad}" y2="${baseline}" stroke="#e0e4e1"></line>
      ${items.map((it, idx) => {
        const cx = x(it.stage.age);
        return `
          <g>
            <rect x="${cx - 22}" y="${baseline - 56}" width="44" height="36" rx="6" fill="${it.color}" fill-opacity="0.92"></rect>
            <text x="${cx}" y="${baseline - 38}" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">${it.text}</text>
            <line x1="${cx}" y1="${baseline - 20}" x2="${cx}" y2="${baseline - 4}" stroke="${it.color}" stroke-width="2"></line>
            <circle cx="${cx}" cy="${baseline - 2}" r="4" fill="${it.color}"></circle>
            <text x="${cx}" y="${height - 6}" text-anchor="middle" font-size="10" fill="#666b70">${it.stage.age}岁</text>
          </g>
        `;
      }).join("")}
    </svg>
  `;
}

// 给居住地等没有 palette 的分类分配稳定颜色
const residencePalette = ["#2e6f73", "#b94e35", "#caa23d", "#5b8def", "#9b87f5", "#2f855a", "#b7791f", "#7e5fb1", "#3b9ddd", "#205f63"];
const residenceColorMap = new Map();
function pickResidenceColor(value) {
  if (!residenceColorMap.has(value)) {
    const idx = residenceColorMap.size % residencePalette.length;
    residenceColorMap.set(value, residencePalette[idx]);
  }
  return residenceColorMap.get(value);
}

function buildMetricOptions() {
  const numeric = Object.entries(numericMetrics).map(([value, info]) => ({ value, label: info.label, type: "数值" }));
  const categorical = Object.entries(categoricalMetrics).map(([value, info]) => ({ value, label: info.label, type: "类别" }));
  return [
    { group: "数值指标", options: numeric },
    { group: "类别指标", options: categorical }
  ];
}

function renderDetail() {
  const person = people.find((item) => item.id === state.selectedPersonId) ?? people[0];
  const selected = getStage(person, state.selectedStageAge);
  const buttons = person.stages.map((stage) => `
    <button type="button" data-age="${stage.age}" class="${stage.age === selected.age ? "selected" : ""}" ${stage.appeared ? "" : "title='未出镜' disabled"}>${stage.age}${stage.appeared ? "" : "*"}</button>
  `).join("");

  const metricGroups = buildMetricOptions();
  const metricOptionsHtml = metricGroups.map((group) => `
    <optgroup label="${group.group}">
      ${group.options.map((opt) => `<option value="${opt.value}" ${opt.value === state.detailMetric ? "selected" : ""}>${opt.label}</option>`).join("")}
    </optgroup>
  `).join("");

  els.detail.innerHTML = `
    <div class="detail-inner">
      <div class="detail-hero"></div>
      <h2>${person.cnName}</h2>
      <p>${person.summary}</p>
      <dl class="facts">
        <div class="fact"><dt>成长背景</dt><dd>${label("originClass", person.originClass)}</dd></div>
        <div class="fact"><dt>当前节点</dt><dd>${selected.year} 年 · ${selected.age} 岁 · ${selected.appeared ? "出镜" : "未出镜"}</dd></div>
        <div class="fact"><dt>居住地</dt><dd>${selected.residence}</dd></div>
        <div class="fact"><dt>教育</dt><dd>${label("education", selected.education)} · ${selected.educationText}</dd></div>
        <div class="fact"><dt>婚姻状况</dt><dd>${label("maritalStatus", selected.maritalStatus)}</dd></div>
        <div class="fact"><dt>家庭状况</dt><dd>${selected.familyStatus}</dd></div>
        <div class="fact"><dt>子女</dt><dd>${selected.childrenCount ?? 0} 个</dd></div>
        <div class="fact"><dt>工作</dt><dd>${label("jobCategory", selected.jobCategory)} · ${selected.jobText}</dd></div>
        <div class="fact"><dt>生活满意度</dt><dd>${label("lifeSatisfaction", selected.lifeSatisfaction)}（${selected.lifeSatisfactionScore || "无"} / 5）</dd></div>
      </dl>
      <div class="timeline">${buttons}</div>
      <div class="metric-control">
        <label>
          趋势指标
          <select id="detailMetric">${metricOptionsHtml}</select>
        </label>
        <span class="metric-hint">切换不同字段查看随年龄变化趋势</span>
      </div>
      ${renderLineChart(person)}
      <div class="stage-note">${selected.notes || "该节点暂无补充说明"}</div>
      <a class="source-link" href="${selected.sourceUrl}" target="_blank" rel="noreferrer">照片/资料来源：CBS News 图集与公开资料</a>
    </div>
  `;
  els.detail.querySelector(".detail-hero").append(createImage(selected.photo || person.photo, `${person.cnName}成长阶段照片`));
  els.detail.querySelectorAll(".timeline button").forEach((button) => {
    if (button.disabled) return;
    button.addEventListener("click", () => {
      state.selectedStageAge = Number(button.dataset.age);
      renderDetail();
    });
  });
  els.detail.querySelector("#detailMetric").addEventListener("change", (event) => {
    state.detailMetric = event.target.value;
    renderDetail();
  });
}

function isValidStageForAge(stage, age) {
  if (!stage) return false;
  if (!stage.appeared) return false;
  if (age <= 14) {
    // 14 岁及以下：婚姻状态必须是单身，子女数量必须为 0，工作应是学生
    if (stage.maritalStatus && !["single", "unknown"].includes(stage.maritalStatus)) return false;
    if (Number(stage.childrenCount) > 0) return false;
    if (stage.jobCategory && !["student", "unknown"].includes(stage.jobCategory)) return false;
  }
  if (age <= 21) {
    // 21 岁及以下：子女数量不应超过 2（部分参与者 21 岁前已结婚生育）
    if (Number(stage.childrenCount) > 2) return false;
  }
  return true;
}

function renderComparison() {
  const groupBy = els.groupBy.value;
  const metric = els.metric.value;
  const age = Number(els.compareAge.value);
  const groups = new Map();

  people.forEach((person) => {
    const stage = getStage(person, age);
    if (!isValidStageForAge(stage, age)) return;
    const key = groupBy === "originClass" ? person.originClass : stage[groupBy];
    if (key == null || key === "" || key === "unknown") return;
    const group = groups.get(key) ?? [];
    group.push(stage);
    groups.set(key, group);
  });

  const rows = [...groups.entries()].map(([key, items]) => {
    const value = metric === "count"
      ? items.length
      : items.reduce((sum, item) => sum + Number(item[metric] || 0), 0) / items.length;
    return { key, label: label(groupBy, key), value, count: items.length };
  }).sort((a, b) => b.value - a.value);

  if (!rows.length) {
    els.chart.innerHTML = `<div class="empty">该年龄节点下没有可对比的数据。</div>`;
    return;
  }

  const max = Math.max(...rows.map((row) => row.value), 1);
  els.chart.innerHTML = `
    <div class="chart-meta">${age} 岁节点的分组表现（仅含 ${people.filter((p) => isValidStageForAge(getStage(p, age), age)).length} 位有效人物）</div>
    ${rows.map((row) => `
      <div class="bar-row">
        <div class="bar-label">${row.label}<span class="bar-count">（${row.count}人）</span></div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.max(3, (row.value / max) * 100)}%"></div>
        </div>
        <div class="bar-value">${metric === "count" ? row.value : row.value.toFixed(2)}${metric === "count" ? "人" : ""}</div>
      </div>
    `).join("")}
  `;
}

function render() {
  renderCards();
  renderDetail();
  renderComparison();
}

function bindEvents() {
  [els.nameFilter, els.ageFilter, els.maritalFilter, els.educationFilter, els.satisfactionFilter].forEach((input) => {
    input.addEventListener("input", render);
  });
  [els.groupBy, els.metric, els.compareAge].forEach((input) => input.addEventListener("input", renderComparison));
  els.resetFilters.addEventListener("click", () => {
    els.nameFilter.value = "";
    els.ageFilter.value = "all";
    els.maritalFilter.value = "all";
    els.educationFilter.value = "all";
    els.satisfactionFilter.value = "all";
    state.selectedStageAge = 63;
    render();
  });
}

populateOptions();
bindEvents();
render();
