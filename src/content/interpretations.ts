// Lo Shu Grid Interpretation Library
// ALL report text lives here. No interpretation text appears anywhere else in the codebase.
// Source: Lo_Shu_Grid_Reference.docx — transcribed verbatim.

export interface NumberInterpretation {
  element: string;
  direction: string;
  keywords: string;
  description: string;
  present: string;
  absent: string;
  repeating: string;
}

export interface PlaneInterpretation {
  numbers: number[];
  present: string;
  absent: string;
}

export interface DriverInterpretation {
  title: string;
  text: string;
}

export interface ConductorInterpretation {
  title: string;
  text: string;
}

export interface KuaInterpretation {
  group: "east" | "west";
  auspiciousDirections: string[];
  inauspiciousDirections: string[];
  text: string;
}

export interface RajYogaInterpretation {
  title: string;
  subtitle: string;
  text: string;
}

// ---------------------------------------------------------------------------
// NUMBER INTERPRETATIONS
// ---------------------------------------------------------------------------

export const NUMBER_INTERPRETATIONS: Record<number, NumberInterpretation> = {
  1: {
    element: "Water",
    direction: "North",
    keywords: "Career \u00b7 Communication \u00b7 Independence",
    description:
      "Number 1 belongs to the Water element and occupies the North position. Water in Chinese philosophy represents the capacity to flow, adapt, and find the path of least resistance \u2014 yet it is also the element of depth, wisdom, and relentless movement toward one\u2019s goals. Number 1 speaks to how a person engages with the world through self-expression, career, and the assertion of individual identity.",
    present:
      "The presence of Number 1 speaks of a clear and confident voice in the world. You carry the Water element\u2019s gift of adaptability \u2014 the ability to navigate around obstacles rather than being stopped by them. There is a natural independence to your character; you are capable of determining your own direction and trust your own judgement. In matters of career and professional life, you tend to be self-motivated, driven by an inner sense of purpose rather than external praise. Communication comes relatively naturally, and you are generally able to make yourself understood \u2014 whether in writing, conversation, or through the quiet authority of your actions. The challenge for those with Number 1 present is not to let independence tip into isolation. The same confidence that serves you well can sometimes create a reluctance to ask for help or acknowledge the contributions of others.",
    absent:
      "The absence of Number 1 suggests that self-expression and asserting your identity in the world may be areas requiring conscious effort. This does not mean you lack ability \u2014 rather, it indicates that stepping forward, making your voice heard, and claiming your place in professional settings may feel less instinctive than it does for others. There can be a tendency to underestimate your own value, to hold back where directness would serve you better, or to let others define the terms of situations you are part of. The path forward often involves small, deliberate acts of self-assertion \u2014 taking credit for your work, initiating rather than waiting, and learning to trust the sound of your own voice.",
    repeating:
      "When Number 1 appears more than once in your grid, its Water energy is amplified. Two 1s typically signal a person with genuine communicative ability \u2014 someone who connects with a wide range of people and finds that words, ideas, and conversation flow with ease. Three or more 1s can introduce an excess of Water energy: a tendency toward overthinking, a restlessness that makes it difficult to settle, or a pattern of talking more than listening. The communicative gift becomes most powerful when balanced by the stillness that allows other voices to be heard.",
  },
  2: {
    element: "Earth",
    direction: "South-West",
    keywords: "Relationships \u00b7 Sensitivity \u00b7 Cooperation",
    description:
      "Number 2 belongs to the Earth element and holds the South-West position. Earth energy is the energy of nourishment, receptivity, and the capacity to hold things together \u2014 the ground beneath the feet, stable, accepting, and sustaining. Number 2 governs the relational world: how we form connections, how sensitive we are to emotional currents, and how well we collaborate with others.",
    present:
      "The presence of Number 2 brings an innate sensitivity to the emotional landscape of your life. You tend to read rooms well \u2014 you notice undercurrents, pick up on what is unsaid, and respond to the needs of those around you with genuine attentiveness. There is a natural instinct for partnership and diplomacy: you generally prefer to work alongside others rather than in isolation, and you have a gift for finding common ground in difficult conversations. The Earth element also brings a patient, measured quality \u2014 you tend to consider the human dimension of any decision before acting. The caution here is a susceptibility to absorbing others\u2019 emotions too deeply, or to prioritising others\u2019 comfort at the expense of your own needs.",
    absent:
      "The absence of Number 2 may manifest as difficulty in the relational and emotional dimensions of life. This does not indicate a cold or unfeeling nature \u2014 more often it points to someone who finds emotional expression or genuine vulnerability uncomfortable, who processes feelings internally rather than sharing them, or who may inadvertently appear more detached than they feel. Cooperation in collaborative settings may require conscious effort. Patience in relationships \u2014 the willingness to slow down, to listen deeply, to sit with another person\u2019s process without trying to fix or redirect it \u2014 is the quality most worth cultivating when Number 2 is absent.",
    repeating:
      "Multiple 2s intensify the Earth element\u2019s receptive, relational energy to a significant degree. A person with two or more 2s is typically deeply attuned to others \u2014 sometimes almost uncomfortably so. This heightened sensitivity is a genuine gift in caregiving, counselling, and any role requiring emotional attunement. The risk is a tendency to become overwhelmed by others\u2019 emotional states, to struggle with boundaries, or to lose one\u2019s own centre in the effort to maintain harmony. Those with triple or quadruple 2s may find that emotions run very close to the surface and that they need to be deliberate about creating space for their own inner life.",
  },
  3: {
    element: "Wood",
    direction: "East",
    keywords: "Creativity \u00b7 Expression \u00b7 Imagination",
    description:
      "Number 3 occupies the East position and belongs to the Wood element. Wood is the energy of spring \u2014 new growth, upward movement, the breaking through of something fresh and alive. It is the element of creativity, of the imagination reaching beyond what currently exists toward what might be possible. Number 3 speaks to creative intelligence, the joy of making and expressing, and the capacity to think beyond convention.",
    present:
      "The presence of Number 3 signals a naturally creative and expressive nature. Ideas come readily, and you tend to see possibilities that others overlook \u2014 connections between disparate things, new angles on familiar problems, the potential in what does not yet exist. There is often a playful quality to those with strong 3 energy \u2014 a willingness to experiment, to not take the first answer as the final one, and to approach life with a degree of wonder. The Wood element\u2019s upward reach also confers optimism: a tendency to expect things to grow and improve over time. The shadow side of strong 3 energy can be restlessness or a difficulty following creative projects through to completion.",
    absent:
      "The absence of Number 3 often shows up as a difficulty accessing or trusting creative impulses. This person may think of themselves as \u2018not creative,\u2019 when in fact creativity may simply not feel like an automatic resource \u2014 it requires more deliberate cultivation. There can be a tendency toward rigidity in thinking, a preference for known methods over experimental ones, and discomfort with ambiguity or open-ended processes. It is worth remembering that creativity is not only artistic \u2014 it includes the ability to innovate, to solve problems in non-linear ways, and to see what is not yet visible. These are the qualities most worth consciously developing when Number 3 is absent.",
    repeating:
      "Two or more 3s amplify the Wood element\u2019s generative energy considerably. A person with repeated 3s is typically brimming with ideas \u2014 perhaps more ideas than can be practically pursued. There is a vitality and expressiveness to this energy that is deeply attractive in social and creative settings. The risk is scattering: too many projects started, not enough finished; creative energy that radiates outward without the grounding force to consolidate it. Three or more 3s can also bring a heightened emotionality \u2014 the East\u2019s expansive energy can tip into reactivity if not balanced by the steadying influence of Earth numbers elsewhere in the chart.",
  },
  4: {
    element: "Wood",
    direction: "South-East",
    keywords: "Organisation \u00b7 Practicality \u00b7 Perseverance",
    description:
      "Number 4 shares the Wood element but occupies the South-East position, associated with wealth, accumulation, and long-term building. Where 3 is the creative spark of new growth, 4 is the sustained effort of tending what has been planted. Number 4 speaks to the capacity for disciplined, organised effort \u2014 the ability to make plans and follow them through, to bring structure to ideas, and to build toward goals with consistency.",
    present:
      "The presence of Number 4 indicates a person with genuine organisational capacity and a strong work ethic. You tend to think ahead, to create systems that support efficiency, and to value reliability \u2014 in yourself and in others. There is a methodical quality to the way you approach problems: you prefer to understand the structure of a situation before acting within it, and you are comfortable with the slow, cumulative process of building something worthwhile over time. The South-East placement connects this number to financial thinking and practical resource management, suggesting a natural attentiveness to how efforts translate into tangible outcomes.",
    absent:
      "The absence of Number 4 often points to challenges in the domains of organisation, follow-through, and practical planning. This is not laziness \u2014 it is a genuine difficulty with the sustained, systematic effort that turns good ideas into completed realities. There may be a tendency to work in bursts of energy rather than with consistent rhythm, to lose interest in the implementation phase of projects, or to avoid the administrative and structural aspects of work and life that Number 4 governs. Building systems and structures \u2014 external scaffolding that supports consistent effort even when the internal drive to organise is less naturally present \u2014 is the most practical path forward.",
    repeating:
      "Multiple 4s create a chart with strong Wood energy in the practical dimension. This person tends to be a capable planner, thorough in execution, and reliable in commitments. The risk is rigidity: an over-reliance on structure that makes it difficult to adapt when plans need to change. Two or more 4s can also produce a tendency toward overthinking \u2014 the planning capacity running ahead of the capacity to act, creating loops of preparation that delay actual movement. The most effective use of strong 4 energy is when it is paired with the creative spontaneity of 3 or the decisive willpower of the Will Plane.",
  },
  5: {
    element: "Earth",
    direction: "Centre",
    keywords: "Balance \u00b7 Stability \u00b7 The Prince Number",
    description:
      "Number 5 occupies the centre of the Lo Shu Grid and belongs to the Earth element. Its position is unique: it touches all eight other numbers simultaneously and is the only number that belongs to every plane and every arrow. In Chinese numerology, Number 5 is known as the Prince Number \u2014 blessed, centred, and universally compatible. The centre represents the point of balance from which all directions radiate.",
    present:
      "The presence of Number 5 is one of the most auspicious signatures in a Lo Shu Grid. As the centre number, it acts as a harmonising force throughout the entire chart \u2014 softening tensions between opposing numbers and creating a natural capacity for balance. Those with Number 5 tend to have an intuitive understanding of how to navigate between extremes: not too emotional, not too detached; not too ambitious, not too passive. There is often an ease in social situations \u2014 a natural warmth and adaptability that makes others comfortable. The centre\u2019s Earth energy also confers a degree of general good fortune, not through luck, but through circumstances tending to resolve constructively for those who carry this energy well.",
    absent:
      "The absence of Number 5 is one of the more significant missing numbers in the system, precisely because of the centre\u2019s role as integrator. Without it, there is no natural mediating force between the other energies in the chart, which can make the personality feel more extreme \u2014 more prone to swinging between states, more susceptible to imbalance. Health and wellbeing may require more deliberate attention. Decision-making, too, can be affected: the centre number helps weigh and integrate, and its absence can produce a tendency to act from one perspective rather than taking the full picture into account. Cultivating stillness, routine, and a grounded daily practice is particularly valuable for those without Number 5.",
    repeating:
      "When Number 5 repeats, its Earth energy becomes very concentrated in the centre. The harmonising quality is amplified, but so is the risk of stagnation \u2014 too much centre energy can make it difficult to commit to a direction. A person with two or more 5s may find they are excellent at seeing all sides of a situation but struggle to take decisive action. The broad social ease remains, but there can be an inertia around change. Triple 5s in a chart are rare and indicate a person who carries an unusual degree of natural equilibrium \u2014 but who may need to be especially deliberate about momentum.",
  },
  6: {
    element: "Metal",
    direction: "North-West",
    keywords: "Responsibility \u00b7 Family \u00b7 Nurturing",
    description:
      "Number 6 belongs to the Metal element and holds the North-West position, associated in Chinese cosmology with heaven, mentors, and helpful people. Metal energy is precise, clarifying, and strong \u2014 it holds its shape under pressure. Number 6 governs the domestic and relational world of responsibility: the care we extend to those close to us, our sense of duty to family and community, and the ways we create and sustain the environments in which life is actually lived.",
    present:
      "The presence of Number 6 indicates a person with a strong sense of responsibility toward others \u2014 particularly those within their immediate circle of family, close friends, and community. There is a genuine warmth here, paired with the Metal element\u2019s reliability and follow-through: this is a person who can be counted on, who takes commitments seriously, and who understands that love is not only a feeling but also a practice of showing up. The North-West placement suggests a natural attunement to guidance and mentorship \u2014 those with 6 often find themselves in roles where they are looked to for stability and practical support. There is frequently a strong aesthetic sense as well, a care for the quality of the environments in which we live and work.",
    absent:
      "The absence of Number 6 can manifest as a tendency to distance from domestic responsibilities or to experience the obligations of close relationships as burdensome rather than nourishing. This does not indicate an uncaring person \u2014 more often it points to someone who has not yet found the framework for understanding care as reciprocal and sustaining rather than draining. There may be a difficulty in creating stable, warm home environments, or a pattern of leaving the maintenance of close relationships to others. Cultivating the domestic and relational sphere \u2014 not as obligation but as genuine investment \u2014 is the key growth area when Number 6 is absent.",
    repeating:
      "Multiple 6s intensify the Metal element\u2019s sense of responsibility significantly. This person takes duties very seriously \u2014 sometimes too seriously. The risk of excess 6 energy is over-responsibility: taking on more than can be sustained, finding it difficult to draw healthy boundaries, or measuring self-worth primarily through what one provides for others. Two or more 6s can also create a tendency toward perfectionism in domestic and relational matters. The gift of strong 6 energy \u2014 genuine care and reliable presence \u2014 is most fully expressed when paired with the permission to receive as well as give.",
  },
  7: {
    element: "Metal",
    direction: "West",
    keywords: "Introspection \u00b7 Wisdom \u00b7 Inner Life",
    description:
      "Number 7 shares the Metal element with Number 6 but occupies the West position, associated with completion, harvest, and the turning inward that comes with autumn. Metal\u2019s clarifying quality here is directed not outward into the world of relationships, but inward \u2014 toward self-understanding, reflection, and the cultivation of inner wisdom. Number 7 speaks to the depth of one\u2019s inner life, the quality of introspection, and the degree to which intuitive dimensions are accessible.",
    present:
      "The presence of Number 7 indicates a person with a rich and active inner world. You tend to process experience deeply, returning to events and relationships long after they have passed to extract meaning and understanding. There is often a philosophical or spiritual dimension to your thinking \u2014 an interest in the bigger questions that lie beneath surface appearances. Intuition tends to be strong, and you generally do well to trust it. The West\u2019s harvest energy gives this number a certain self-sufficiency: those with 7 are usually comfortable with solitude and may actively need time alone to recharge. The Metal element\u2019s precision means this introspection tends to be incisive, yielding genuine insight rather than mere rumination.",
    absent:
      "The absence of Number 7 often shows up as a difficulty accessing one\u2019s inner life \u2014 a tendency to live predominantly in the external world of action and obligation without building the counterweight of genuine self-reflection. This can manifest as a lack of self-awareness, a difficulty understanding one\u2019s own motivations, or a sense of being slightly disconnected from one\u2019s deeper instincts. Intuition may feel unreliable or inaccessible. The harvest dimension of the West \u2014 the capacity to assimilate experience into wisdom \u2014 may also be affected, leading to a pattern of going through experiences without fully digesting them. Practices that create deliberate space for solitude and reflection are particularly valuable when Number 7 is absent.",
    repeating:
      "Two or more 7s produce a personality with a very strong and sometimes dominant inner life. The capacity for self-reflection is a genuine strength, but when Metal energy accumulates here, there is a risk of excessive withdrawal: spending so much time in the interior world that engagement with the external one becomes difficult. Social situations can feel draining, and there may be a pattern of analysing experience so thoroughly that the freshness of the present moment is missed. The wisdom that strong 7 energy generates is real and valuable \u2014 the challenge is learning to bring it back out into the world rather than keeping it as purely private treasure.",
  },
  8: {
    element: "Earth",
    direction: "North-East",
    keywords: "Abundance \u00b7 Memory \u00b7 Achievement",
    description:
      "Number 8 belongs to the Earth element and occupies the North-East position, associated in Chinese Feng Shui with knowledge, education, and the accumulation of wisdom over time. In China, 8 is considered among the most auspicious of all numbers \u2014 a symbol of abundance, fortunate outcomes, and the rewards of disciplined effort. Number 8 governs the practical achievement of material and intellectual goals and the capacity to build lasting value over time.",
    present:
      "The presence of Number 8 in your grid is an indicator of strong material and intellectual potential. The Earth element\u2019s grounding quality gives this number a particular patience and thoroughness \u2014 you tend to do things properly, to build on solid foundations, and to trust that consistent effort will yield results over time. Memory and attention to detail are typically strong, and there is often a genuine enjoyment of learning and the accumulation of knowledge. In matters of career and finance, you are likely to be disciplined and methodical, understanding that wealth in all its forms is built through sustained, intelligent effort rather than sudden windfalls. The North-East placement connects this number to the development of wisdom: the sense that one\u2019s best work often comes in the later chapters of life.",
    absent:
      "The absence of Number 8 may point to challenges in the domains of practical achievement, self-discipline, and financial management. This person may find it difficult to sustain the methodical effort that building material security requires, or they may undervalue the slow accumulation of knowledge and skill. There can be a tendency toward impatience with processes that require sustained attention, or a difficulty translating capability into tangible outcomes. The Earth element\u2019s stabilising quality \u2014 the capacity to stay grounded and keep building even when results are slow in coming \u2014 is what most needs to be cultivated. Financial literacy and the establishment of clear, realistic long-term goals are particularly useful practices when Number 8 is absent.",
    repeating:
      "Multiple 8s intensify the Earth element\u2019s accumulating quality to a high degree. This person is often very thorough, highly detail-oriented, and genuinely committed to excellence in whatever they undertake. The risk of excess Earth energy here is stubbornness \u2014 a difficulty revising beliefs or approaches once they have been established, and a tendency to equate painstaking effort with virtue, which can make it hard to delegate or to know when good enough is genuinely good enough. Two or more 8s can also create a somewhat serious quality \u2014 the lightness and spontaneity that come from other elements may need to be deliberately cultivated.",
  },
  9: {
    element: "Fire",
    direction: "South",
    keywords: "Recognition \u00b7 Ambition \u00b7 Completion",
    description:
      "Number 9 belongs to the Fire element and holds the South position, the direction of maximum solar energy, fame, and public recognition. Fire is the most dynamic and expansive of the five elements \u2014 it illuminates, transforms, and draws the attention of others. In Chinese numerology, 9 is the number of completion: the last and highest of the single digits, associated with the fulfilment of potential and the ambition to matter in the world beyond one\u2019s immediate circle.",
    present:
      "The presence of Number 9 indicates a person with genuine ambition and a strong drive toward recognition and achievement. Fire energy at its best is inspiring and radiant \u2014 you tend to set high goals, push toward them with energy and determination, and carry others along with the heat of your own enthusiasm. There is often a natural public presence: a comfort with being seen, with leading, with representing something larger than yourself. The South placement connects this number to reputation and legacy \u2014 you tend to care about how you are perceived and about the long-term impact of what you do. The Fire element also brings passion: you feel things deeply, commit fiercely when you care, and rarely do anything half-heartedly.",
    absent:
      "The absence of Number 9 may manifest as a tendency to hold back from the public stage \u2014 to do excellent work that goes unrecognised, to underestimate the value of self-promotion, or to feel that ambition itself is somehow uncomfortable or inappropriate. There can be a pattern of working hard behind the scenes while others less capable move into visible roles. The Fire element\u2019s qualities of passion and inspiration may also be muted. Finding a cause or vision worth caring about passionately \u2014 something that connects private effort to larger meaning \u2014 is the key developmental task when Number 9 is absent.",
    repeating:
      "Two or more 9s produce an exceptionally strong Fire signature. The ambition, passion, and drive toward recognition are amplified significantly. Triple 9s in particular indicate a person with a powerful sense of destiny and vision \u2014 someone capable of extraordinary impact when their considerable energy is channelled constructively. The challenges of excess Fire energy are also real: a tendency toward impatience, irritability, or a kind of grandiosity that makes it difficult to work within ordinary constraints. Multiple 9s indicate a person who runs hot \u2014 who pushes hard and achieves greatly, but may burn out if sufficient Earth and Water energy is not built into their lives to balance the Fire\u2019s intensity.",
  },
};

// ---------------------------------------------------------------------------
// PLANE INTERPRETATIONS
// ---------------------------------------------------------------------------

export const PLANE_INTERPRETATIONS: Record<string, PlaneInterpretation> = {
  "Mind Plane": {
    numbers: [4, 9, 2],
    present:
      "You possess a sharp and naturally analytical mind. The combination of Wood\u2019s organisational capacity (4), Fire\u2019s expansive vision (9), and Earth\u2019s receptive intelligence (2) creates a person who can both generate ideas and rigorously evaluate them. Memory tends to be strong, and you are likely someone who retains information well and draws on a broad base of knowledge. Logic and intuition are not opposites in your experience \u2014 you can move fluidly between systematic reasoning and instinctive understanding. Decision-making is typically sound: you gather enough information to act with confidence and are rarely caught entirely off-guard by the implications of a choice. At its best, the Mind Plane produces the kind of thinking that can hold a complex situation whole \u2014 seeing both the detail and the pattern simultaneously.",
    absent:
      "The absence of the Mind Plane suggests that analytical thinking, clear reasoning, and the management of complex information may not come naturally. This does not indicate low intelligence \u2014 it points instead to a thinking style that is less comfortable with systematic analysis and may rely more heavily on feeling, experience, or social cues than on logical examination of evidence. Memory for abstract information may be less reliable than memory for people, experiences, or emotional impressions. When facing complex decisions, there can be a tendency toward impulsive action or avoidance rather than careful deliberation. The growth path involves developing tools for structured thinking \u2014 frameworks, checklists, note-taking practices \u2014 that provide external scaffolding for the analytical process.",
  },
  "Emotional Plane": {
    numbers: [3, 5, 7],
    present:
      "The complete Emotional Plane produces a person of deep feeling and genuine emotional intelligence. Wood\u2019s creativity (3), Earth\u2019s stabilising centre (5), and Metal\u2019s reflective depth (7) combine to create a rich inner life paired with the capacity to engage meaningfully with others. You are typically highly attuned to the emotional currents of your environment \u2014 you notice what others are feeling, often before they have expressed it, and you respond with genuine empathy. Creativity and emotion are intertwined for you: your best creative work often emerges directly from feeling states, and emotional experience tends to inspire rather than overwhelm. The centre number 5 provides a balancing influence, ensuring that the depth of feeling is grounded rather than chaotic. This is one of the most artistically and spiritually fertile plane combinations in the grid.",
    absent:
      "The absence of the Emotional Plane may manifest as a certain emotional flatness or detachment \u2014 not necessarily an absence of feeling, but a difficulty accessing, expressing, or being comfortable with the full range of emotional experience. There can be a tendency to intellectualise or to downplay the emotional dimension of situations, retreating into practical or logical frameworks when feeling would serve better. Creative expression may also be affected, particularly when it requires accessing genuine vulnerability or emotional truth. Those without this plane benefit most from practices that gently expand emotional range: exposure to art, music, storytelling, and meaningful conversation that invites feeling rather than analysis.",
  },
  "Practical Plane": {
    numbers: [8, 1, 6],
    present:
      "The complete Practical Plane is one of the most materially fortunate configurations in the Lo Shu Grid, combining the three numbers most directly associated with worldly success. Earth\u2019s abundance (8), Water\u2019s adaptability and career drive (1), and Metal\u2019s responsible follow-through (6) create a person who can conceive a goal, navigate the path toward it, and see it through to completion. You tend to be effective in the world \u2014 not necessarily flashy or dramatic, but reliably capable. Financial intelligence is often strong, and you are generally comfortable with the practical dimensions of life: managing resources, maintaining commitments, and producing tangible results. This plane earns its reputation as the prosperity plane because it combines the three energies that, when acting together, turn aspiration into achievement.",
    absent:
      "The absence of the Practical Plane represents one of the more challenging missing-arrow configurations. Without the grounding influence of Earth (8), the adaptive career drive of Water (1), and the responsible completion energy of Metal (6), there can be a pattern of aspirations that fail to translate into material reality. Ideas may be generated but not implemented; projects begun but not finished; financial stability pursued but not consistently achieved. There can also be a tendency to undervalue practical skill and execution \u2014 to be more comfortable in the world of ideas and possibilities than in the world of implementation and follow-through. The work here is the slow, deliberate cultivation of practical habits: finishing what is started, understanding one\u2019s finances, honouring commitments, and learning to value the unglamorous work of building.",
  },
  "Thought Plane": {
    numbers: [4, 3, 8],
    present:
      "The complete Thought Plane brings together the two Wood numbers (4 and 3) with the Earth number of achievement (8), creating a powerful combination of creative thinking, practical organisation, and the determination to see ideas through to their full expression. You are likely a person with a genuine gift for conceptual thinking \u2014 the ability to generate original ideas and then build the structural framework that brings them into reality. Where many creative people struggle with the gap between inspiration and execution, those with the Thought Plane active are more naturally equipped to bridge it. Teachers, coaches, architects, planners, and strategic thinkers often carry this configuration. There is also a strong ethical dimension to this plane: the combination of organised thought, expressive creativity, and accumulated wisdom tends to produce a person who thinks carefully about the impact and integrity of their ideas.",
    absent:
      "The absence of the Thought Plane suggests challenges in the realm of structured, purposeful thinking. There may be a tendency to react rather than plan \u2014 to be driven by immediate circumstances rather than long-term vision, or to generate ideas without the follow-through capacity to develop them fully. Decision-making can feel more difficult, especially in situations that require holding multiple variables in mind simultaneously. There can also be an impulsive quality \u2014 acting on instinct without sufficient consideration of consequences, or making commitments that are difficult to sustain because the planning that would have made them viable was skipped. The development of journalling, project planning, and deliberate creative practice are useful pathways for those without this plane.",
  },
  "Will Plane": {
    numbers: [9, 5, 1],
    present:
      "The complete Will Plane is arguably the most powerful of the vertical planes, combining Fire\u2019s ambition and vision (9), Earth\u2019s centred stability (5), and Water\u2019s adaptive drive and self-expression (1). This combination produces a person with extraordinary willpower \u2014 the capacity to set ambitious goals, maintain focus and determination over long periods, and keep moving through difficulty and setback without losing sight of the destination. Where others waver, those with the Will Plane active tend to hold firm. There is a quality of self-reliance and quiet confidence here: you know what you want, you know who you are, and you trust that the effort you put in will eventually yield the result you are after. Leaders, athletes, and high achievers across fields frequently carry this configuration.",
    absent:
      "The absence of the Will Plane is one of the more significant challenges in the grid, as willpower and sustained self-determination are among the most foundational qualities for achieving any long-term goal. Without the combined energy of Fire (9), Earth (5), and Water (1), there can be a tendency to be easily influenced by others, to abandon goals when the path becomes difficult, or to define oneself through external validation rather than internal conviction. Procrastination may be a persistent pattern \u2014 not from laziness but from a lack of the motivating force that keeps a person moving forward even when momentum is difficult to find. The path forward involves deliberately building the muscles of self-discipline: starting small, creating accountability structures, and practising the art of keeping promises to oneself.",
  },
  "Action Plane": {
    numbers: [2, 7, 6],
    present:
      "The complete Action Plane brings together Earth\u2019s relational sensitivity (2), Metal\u2019s reflective wisdom (7), and Metal\u2019s responsible follow-through (6) in the column associated with the capacity to translate intention into action. Those with this plane active are typically decisive in the practical sense: not impulsive, but genuinely willing to move when movement is required. There is a quality of readiness here \u2014 a lack of the hesitation that prevents many people from taking the step that would make the difference. Physical vitality and activity are also associated with this plane. The combination of social sensitivity, inner wisdom, and dutiful follow-through means that the actions taken are typically considered, well-timed, and attuned to the human dimensions of the situation.",
    absent:
      "The absence of the Action Plane often manifests as a persistent gap between knowing and doing. This person may have excellent insight, good intentions, and real capability \u2014 but find that actually taking the decisive action that would make things move remains consistently difficult. Opportunities may be recognised but not seized; decisions that could be made are delayed; the moment of commitment is perpetually postponed. This is not weakness of character \u2014 it is a structural absence of the energetic current that makes action feel natural and available. The development of bias-toward-action practices \u2014 particularly the habit of making the smallest possible version of a decision and acting on it immediately \u2014 is particularly valuable for those without this plane.",
  },
  "Golden Yog": {
    numbers: [4, 5, 6],
    present:
      "The Golden Yog is the most celebrated configuration in Lo Shu numerology. When numbers 4, 5, and 6 are all present in a person\u2019s grid, they create a diagonal arrow that passes through Wood (4), Earth-Centre (5), and Metal (6) \u2014 three of the most practically oriented and materially grounded energies in the system. This is the combination most directly associated with worldly success: name, fame, and the ability to accumulate wealth and social standing through one\u2019s own efforts. Those born with the Golden Yog carry a natural alignment between hard work (4), balanced judgment (5), and responsible execution (6) that tends to produce results others notice. There is often a quality of things working out for this person \u2014 not through supernatural fortune, but because the energies of organisation, centred decision-making, and follow-through are all active simultaneously. Progress often accelerates after significant life milestones, particularly the assumption of major responsibility.",
    absent: "",
  },
  "Silver Yog": {
    numbers: [2, 5, 8],
    present:
      "The Silver Yog connects the three Earth numbers of the Lo Shu Grid \u2014 the relational sensitivity of 2 (South-West), the stabilising centre of 5, and the achievement and knowledge energy of 8 (North-East). This combination is strongly associated with material accumulation, particularly in the form of property, assets, and the patient building of wealth over time. Those who carry the Silver Yog have a natural instinct for stability and long-term value \u2014 they tend to build rather than speculate, to invest in things that endure. There is often a significant inheritance dimension: assets, property, or accumulated wisdom passing between generations. The Silver Yog also speaks to inner solidity \u2014 these people tend to weather life\u2019s fluctuations with equanimity, knowing that the foundation they have built will hold. The challenge of this configuration is that its very stability can make it resistant to necessary change.",
    absent: "",
  },
};

// ---------------------------------------------------------------------------
// DRIVER INTERPRETATIONS
// ---------------------------------------------------------------------------

export const DRIVER_INTERPRETATIONS: Record<number, DriverInterpretation> = {
  1: {
    title: "The Initiator",
    text: "Driver 1s are self-directed and independent by nature. You have a strong sense of who you are and what you want, and you instinctively move toward your goals under your own power. Even when working within structures or teams, there is a quiet leadership quality to the way you operate. Others often perceive you as confident and capable before you have said very much at all. The risk is that this self-sufficiency can tip into rigidity: a reluctance to adapt, to delegate, or to acknowledge that another approach might serve better than your own.",
  },
  2: {
    title: "The Harmoniser",
    text: "Driver 2s move through life with a natural instinct for partnership and diplomacy. You tend to read a room before you act, to sense the mood of those around you, and to adjust your approach accordingly. This is not insincerity \u2014 it is genuine attunement, a real gift for making others feel seen and considered. You are a natural collaborator: someone whose best work often emerges in relationship with others. The challenge for Driver 2s is that this sensitivity to others can make self-assertion uncomfortable, and important personal needs can go unvoiced for too long.",
  },
  3: {
    title: "The Expressive",
    text: "Driver 3s bring creative energy and warmth into every room. You have a natural gift for communication \u2014 for finding the words, the image, or the story that makes something come alive for others. There is an optimism to your personality that tends to be infectious: people around you often feel more hopeful, more animated, more imaginatively engaged simply because you are present. The creative flow is real and valuable, but it benefits from grounding \u2014 Driver 3s sometimes find that the momentum of ideas outpaces the structures needed to bring them to completion.",
  },
  4: {
    title: "The Builder",
    text: "Driver 4s are the people others rely on to make things happen. You approach life with a methodical quality \u2014 you understand that good outcomes are built through consistent, disciplined effort, and you have both the capacity and the willingness to put in that effort. Systems, plans, and well-considered procedures are not constraints to you but tools. Others perceive you as dependable, thorough, and serious. The caution is that this reliability can be taken for granted, and the Driver 4\u2019s work ethic can lead to burnout if boundaries are not maintained.",
  },
  5: {
    title: "The Catalyst",
    text: "Driver 5s carry the energy of the centre \u2014 adaptable, socially fluent, and comfortable in a wide range of situations. You have a gift for bringing people together and for navigating between opposing forces without being captured by either. There is a curiosity to your personality, a genuine interest in variety and in the texture of experience. Others tend to find you approachable and easy to be around. The challenge for Driver 5s is finding direction in the midst of all that adaptability \u2014 with so many possibilities feeling equally open, commitment can be difficult.",
  },
  6: {
    title: "The Caretaker",
    text: "Driver 6s are defined by their orientation toward responsibility and the needs of others. You are the person people turn to when they need steadiness, practical support, or a reliably present witness to their experience. There is a warmth to your personality that others feel quickly. Home, family, and close community are deeply important to you \u2014 not as obligations but as the context in which life has its deepest meaning. The growth edge for Driver 6s is learning to receive as well as give, and to honour their own needs as legitimate without guilt.",
  },
  7: {
    title: "The Seeker",
    text: "Driver 7s are inner-directed people whose richest experiences tend to be private ones. You have a genuine depth of mind and a restless need to understand things properly \u2014 not just to know facts, but to penetrate to the underlying principles that explain them. Others often perceive you as perceptive and thoughtful, sometimes mysterious. You are most comfortable in situations that give you genuine intellectual or spiritual engagement, and least comfortable in shallow or purely performative social settings. The growth edge is bringing the treasure of your inner world outward in ways others can access.",
  },
  8: {
    title: "The Achiever",
    text: "Driver 8s move through life with a steady orientation toward achievement and the building of lasting value. You are not typically drawn to short-term wins \u2014 you think in terms of what endures, what can be built and sustained over decades rather than days. Others perceive you as serious, capable, and thorough. There is an authority to your manner that comes not from assertion but from the quality of your attention and effort. The caution is a tendency toward perfectionism and inflexibility \u2014 the high standards that drive excellent work can also make it difficult to know when something is good enough.",
  },
  9: {
    title: "The Visionary",
    text: "Driver 9s are animated by a sense of larger purpose. You tend to see the big picture \u2014 the patterns, the possibilities, the meaning behind events \u2014 and you are most alive when engaged with something that feels genuinely important. There is an intensity to your personality: you commit fiercely to what you care about, and you can inspire others with the force of your conviction. Public life, leadership, and the pursuit of recognition are natural territories for Driver 9s. The risk is that the grand vision can make ordinary life feel insufficient, and the fire of ambition needs grounding in the day-to-day.",
  },
};

// ---------------------------------------------------------------------------
// CONDUCTOR INTERPRETATIONS
// ---------------------------------------------------------------------------

export const CONDUCTOR_INTERPRETATIONS: Record<number, ConductorInterpretation> = {
  1: {
    title: "The Path of Self-Determination",
    text: "The Conductor 1 life path is fundamentally about learning to stand in your own identity with confidence and clarity. Over the course of your life, you will be repeatedly brought to the question of independence \u2014 of who you are when you are not defined by a role, a relationship, or an external expectation. The lessons of this path often involve moments where you must choose your own direction against the grain of what others expect or prefer. The reward for meeting these challenges is a quality of authentic selfhood \u2014 a genuinely earned sense of personal authority \u2014 that is one of the most valuable things a person can carry.",
  },
  2: {
    title: "The Path of Partnership",
    text: "The Conductor 2 life path unfolds primarily through the quality of relationships. The deepest learning of this path comes through others \u2014 through the negotiation of difference, the navigation of conflict, the practice of genuine cooperation, and the development of emotional intelligence that only sustained relationship can provide. Over time, those on this path tend to become extraordinary partners, mediators, and connectors \u2014 people in whom others sense a true quality of understanding. The challenge is learning that sensitivity is a strength rather than a liability.",
  },
  3: {
    title: "The Path of Creative Expression",
    text: "The Conductor 3 life path calls toward the full, uninhibited expression of creative vision. Whatever the medium \u2014 artistic, verbal, social, entrepreneurial \u2014 the thread running through this life is the exploration and communication of what is new, possible, and alive. The lessons of this path often involve overcoming the inhibition that prevents genuine creative risk, and learning to value the process of expression as much as its outcomes. Those who walk this path fully tend to leave the world measurably more colourful and alive than they found it.",
  },
  4: {
    title: "The Path of Building",
    text: "The Conductor 4 life path is concerned with the creation of lasting, solid foundations \u2014 in career, in family, in community, in one\u2019s own character. The deep learning of this path comes through sustained effort over time, through the humility of doing necessary work that may not be glamorous, and through the discovery that reliability and craftsmanship are forms of excellence as real as any more celebrated achievement. Those who walk this path fully find that their most enduring satisfaction comes from what they have actually built rather than from what they have merely imagined.",
  },
  5: {
    title: "The Path of Freedom",
    text: "The Conductor 5 life path is shaped by a fundamental need for freedom, variety, and the space to experience life in its full range. The deep lessons of this path come through embracing change rather than managing it, through the discovery that flexibility and adaptability are genuine wisdom rather than lack of conviction, and through the development of a self that is stable precisely because it is not rigid. The challenge of this path is learning to bring the gifts of freedom and variety to others without becoming so footloose that genuine connection and commitment become impossible.",
  },
  6: {
    title: "The Path of Service",
    text: "The Conductor 6 life path unfolds through the domain of responsibility \u2014 particularly toward family, community, and the practical welfare of those within one\u2019s sphere. The deep learning of this path involves understanding the difference between service as genuine love and service as compulsion, and developing the wisdom to give without depletion. Those who walk this path fully become pillars of their communities. The growth edge involves learning that service includes honest self-care: maintaining one\u2019s own wellbeing as the foundation from which genuine care for others flows.",
  },
  7: {
    title: "The Path of Wisdom",
    text: "The Conductor 7 life path is one of deepening self-knowledge and the cultivation of genuine inner authority. The deep lessons of this path come through solitude, introspection, and the slow, patient work of understanding what is actually true as distinct from what is merely believed or assumed. Those on this path are typically called toward questions of meaning and the nature of reality \u2014 questions that cannot be answered quickly, but whose pursuit gradually reveals a quality of wisdom that others recognise as something earned rather than merely acquired. The challenge is learning to trust the inner knowing that this path develops, and to bring it into the world with confidence.",
  },
  8: {
    title: "The Path of Abundance",
    text: "The Conductor 8 life path is centrally concerned with the right use of power, resources, and material capability. The deep learning of this path involves developing the capacity to build, accumulate, and achieve \u2014 and then, equally importantly, to use what has been built for genuine value rather than mere accumulation. Those who walk this path fully tend to achieve significant material success, but the real reward is a quality of practical wisdom that comes from having genuinely mastered the challenge of manifesting intention in the material world.",
  },
  9: {
    title: "The Path of Completion",
    text: "The Conductor 9 life path is in many ways the most expansive of all the paths \u2014 it is concerned with the completion of a cycle and the contribution of something genuinely significant to the world. The deep lessons of this path involve learning to let go of the personal in service of the larger, to act from generosity rather than need for recognition, and to develop the kind of inclusive vision that can hold diversity without requiring conformity. Those who walk this path fully tend to live with unusual breadth and depth of experience, and to leave behind them a contribution that outlasts the individual circumstances of their lives.",
  },
};

// ---------------------------------------------------------------------------
// KUA INTERPRETATIONS
// ---------------------------------------------------------------------------

export const KUA_INTERPRETATIONS: Record<number, KuaInterpretation> = {
  1: {
    group: "east",
    auspiciousDirections: [
      "North (Success)",
      "South (Health)",
      "East (Relationship)",
      "South-East (Growth)",
    ],
    inauspiciousDirections: ["West", "North-West", "South-West", "North-East"],
    text: "Your Kua Number is 1, placing you in the East Group. Your personal energy is aligned with the Water element and flows most freely in an environment that supports movement, clarity, and the opening of new pathways. Your most powerful direction is the North \u2014 the direction of career, opportunity, and the forward movement of life force. When you face North while working, making important decisions, or sleeping with your head oriented northward, you are aligning with the direction in which your personal energy most naturally amplifies. The South supports your health and physical vitality. The East is your relationship direction, supporting harmony in close partnerships and family. The South-East supports personal growth, learning, and the development of inner resources. Your most challenging directions \u2014 West, North-West, South-West, and North-East \u2014 are best avoided for the orientations of key furniture, doors, and work positions.",
  },
  2: {
    group: "west",
    auspiciousDirections: [
      "South-West (Success)",
      "North-West (Health)",
      "North-East (Relationship)",
      "West (Growth)",
    ],
    inauspiciousDirections: ["East", "South-East", "North", "South"],
    text: "Your Kua Number is 2, placing you in the West Group. Your personal energy aligns with Earth and resonates most powerfully with the South-West \u2014 the direction of relationships, family, and the nurturing of what has been built. Facing South-West in your most important activities draws the most concentrated form of your personal fortune energy toward you. North-West supports your health and the attraction of mentors and helpful people into your life. North-East, associated with knowledge and achievement, is your relationship direction. The West, a direction of harvest and completion, supports your personal development and inner growth. East Group directions \u2014 East, South-East, North, and South \u2014 work against rather than with your personal Qi, and are best avoided for key environmental orientations.",
  },
  3: {
    group: "east",
    auspiciousDirections: [
      "South-East (Success)",
      "East (Health)",
      "South (Relationship)",
      "North (Growth)",
    ],
    inauspiciousDirections: ["West", "South-West", "North-East", "North-West"],
    text: "Your Kua Number is 3, placing you in the East Group. Your personal energy belongs to the Wood element and draws its greatest strength from the South-East \u2014 the direction of growth, abundance, and the steady building of wealth through one\u2019s own efforts. This is your most powerful direction, best suited for the orientation of your desk, bed head, and the direction you face for important work or decisions. The East supports your health and physical vitality. The South brings relationship harmony and social wellbeing. The North, the direction of career and life movement, supports your personal development and learning. West-facing energies \u2014 West, South-West, North-East, and North-West \u2014 are least aligned with your personal Qi.",
  },
  4: {
    group: "east",
    auspiciousDirections: [
      "East (Success)",
      "South-East (Health)",
      "North (Relationship)",
      "South (Growth)",
    ],
    inauspiciousDirections: ["West", "South-West", "North-East", "North-West"],
    text: "Your Kua Number is 4, placing you in the East Group. Your Qi resonates strongly with Wood energy and finds its fullest expression when facing East \u2014 the direction of new beginnings, creative power, and the dawn. Facing East amplifies your success energy and is your most recommended direction for work and important decisions. South-East supports your health and the careful accumulation of resources. North is your relationship direction, bringing harmony to partnerships and family connections. The South, with its Fire and public energy, supports your personal growth and self-development. Like all East Group members, your Qi is least well served by West Group directions.",
  },
  6: {
    group: "west",
    auspiciousDirections: [
      "West (Success)",
      "North-East (Health)",
      "North-West (Relationship)",
      "South-West (Growth)",
    ],
    inauspiciousDirections: ["East", "South-East", "North", "South"],
    text: "Your Kua Number is 6, placing you in the West Group. Your energy is Metal in nature \u2014 precise, clarifying, and strengthened by the West and the directions of heaven and completion. The West is your most auspicious direction, aligning your personal energy with success, recognition, and the achievement of long-term goals. North-East supports your health and the steady building of knowledge and wisdom. North-West, the direction of heaven and mentors in Chinese tradition, is your relationship direction \u2014 supporting the development of deep partnerships and the attraction of helpful people into your life. South-West supports your personal growth and inner development.",
  },
  7: {
    group: "west",
    auspiciousDirections: [
      "North-West (Success)",
      "South-West (Health)",
      "West (Relationship)",
      "North-East (Growth)",
    ],
    inauspiciousDirections: ["East", "South-East", "North", "South"],
    text: "Your Kua Number is 7, placing you in the West Group. Your energy shares Metal\u2019s quality with Kua 6 but expresses it through the West\u2019s harvest energy \u2014 a capacity for completion, self-sufficiency, and the distillation of experience into wisdom. Your most powerful success direction is North-West, the direction associated with heaven, authority, and the support of powerful mentors and allies. South-West supports your health and grounds your energy in Earth\u2019s stability. West is your relationship direction, supporting harmony in your closest partnerships. North-East supports your personal growth, learning, and the development of inner resources.",
  },
  8: {
    group: "west",
    auspiciousDirections: [
      "North-East (Success)",
      "West (Health)",
      "South-West (Relationship)",
      "North-West (Growth)",
    ],
    inauspiciousDirections: ["East", "South-East", "North", "South"],
    text: "Your Kua Number is 8, placing you in the West Group. Your personal energy is Earth, and it draws its greatest potency from the North-East \u2014 the direction of knowledge, achievement, and the gradual accumulation of wisdom and resource over time. This is your most auspicious direction: facing North-East for important work, decisions, and sleep amplifies your success energy most powerfully. The West supports your health and physical vitality. South-West, the direction of family and partnerships, is your relationship direction. North-West, associated with heaven and helpful people, supports your personal development.",
  },
  9: {
    group: "east",
    auspiciousDirections: [
      "South (Success)",
      "North (Health)",
      "South-East (Relationship)",
      "East (Growth)",
    ],
    inauspiciousDirections: ["West", "North-West", "South-West", "North-East"],
    text: "Your Kua Number is 9, placing you in the East Group. Your energy is Fire and it burns most brightly when facing South \u2014 the direction of fame, recognition, and the full expression of one\u2019s gifts in the world. The South is your most powerful success direction, bringing your personal energy into its greatest alignment with outward achievement and public recognition. North supports your health and physical vitality. South-East is your relationship direction, supporting the harmony of close partnerships and family connections. East, the direction of new growth and creative beginnings, supports your personal development and learning.",
  },
};

// ---------------------------------------------------------------------------
// RAJ YOGA INTERPRETATIONS
// ---------------------------------------------------------------------------

export const RAJ_YOGA_INTERPRETATIONS = {
  goldenYog: {
    title: "Golden Yog",
    subtitle: "The Success Plane (4 \u2013 5 \u2013 6)",
    text: "The Golden Yog is the most celebrated configuration in Lo Shu numerology. When numbers 4, 5, and 6 are all present in a person\u2019s grid, they create a diagonal arrow that passes through Wood (4), Earth-Centre (5), and Metal (6) \u2014 three of the most practically oriented and materially grounded energies in the system. This is the combination most directly associated with worldly success: name, fame, and the ability to accumulate wealth and social standing through one\u2019s own efforts. Those born with the Golden Yog carry a natural alignment between hard work (4), balanced judgment (5), and responsible execution (6) that tends to produce results others notice. There is often a quality of things working out for this person \u2014 not through supernatural fortune, but because the energies of organisation, centred decision-making, and follow-through are all active simultaneously. Progress often accelerates after significant life milestones, particularly the assumption of major responsibility.",
  },
  silverYog: {
    title: "Silver Yog",
    subtitle: "The Property Plane (2 \u2013 5 \u2013 8)",
    text: "The Silver Yog connects the three Earth numbers of the Lo Shu Grid \u2014 the relational sensitivity of 2 (South-West), the stabilising centre of 5, and the achievement and knowledge energy of 8 (North-East). This combination is strongly associated with material accumulation, particularly in the form of property, assets, and the patient building of wealth over time. Those who carry the Silver Yog have a natural instinct for stability and long-term value \u2014 they tend to build rather than speculate, to invest in things that endure. There is often a significant inheritance dimension: assets, property, or accumulated wisdom passing between generations. The Silver Yog also speaks to inner solidity \u2014 these people tend to weather life\u2019s fluctuations with equanimity, knowing that the foundation they have built will hold. The challenge of this configuration is that its very stability can make it resistant to necessary change.",
  },
};
