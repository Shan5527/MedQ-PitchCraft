import { placeholderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export type Blog = {
  slug: string;
  title: string;
  snippet: string;
  image: ImagePlaceholder | undefined;
  content: string;
};

export const blogs: Blog[] = [
  {
    slug: "navigating-senior-health",
    title: "Navigating Senior Health",
    snippet: "Key tips for staying healthy and active in your golden years.",
    image: placeholderImages.find(p => p.id === 'blog-1'),
    content: `**Overview**

People worldwide are living longer. Today most people can expect to live into their sixties and beyond. Every country in the world is experiencing growth in both the size and the proportion of older persons in the population.

By 2030, 1 in 6 people in the world will be aged 60 years or over. At this time the share of the population aged 60 years and over will increase from 1 billion in 2020 to 1.4 billion. By 2050, the world’s population of people aged 60 years and older will double (2.1 billion). The number of persons aged 80 years or older is expected to triple between 2020 and 2050 to reach 426 million.

While this shift in distribution of a country's population towards older ages – known as population ageing – started in high-income countries (for example in Japan 30% of the population is already over 60 years old), it is now low- and middle-income countries that are experiencing the greatest change. By 2050, two-thirds of the world’s population over 60 years will live in low- and middle-income countries.

**Ageing explained**

At the biological level, ageing results from the impact of the accumulation of a wide variety of molecular and cellular damage over time. This leads to a gradual decrease in physical and mental capacity, a growing risk of disease and ultimately death. These changes are neither linear nor consistent, and they are only loosely associated with a person’s age in years. The diversity seen in older age is not random. Beyond biological changes, ageing is often associated with other life transitions such as retirement, relocation to more appropriate housing and the death of friends and partners.

**Common health conditions associated with ageing**

Common conditions in older age include hearing loss, cataracts and refractive errors, back and neck pain and osteoarthritis, chronic obstructive pulmonary disease, diabetes, depression and dementia. As people age, they are more likely to experience several conditions at the same time.

Older age is also characterized by the emergence of several complex health states commonly called geriatric syndromes. They are often the consequence of multiple underlying factors and include frailty, urinary incontinence, falls, delirium and pressure ulcers.

**Factors influencing healthy ageing**

A longer life brings with it opportunities, not only for older people and their families, but also for societies as a whole. Additional years provide the chance to pursue new activities such as further education, a new career or a long-neglected passion. Older people also contribute in many ways to their families and communities. Yet the extent of these opportunities and contributions depends heavily on one factor: health.

Evidence suggests that the proportion of life in good health has remained broadly constant, implying that the additional years are in poor health. If people can experience these extra years of life in good health and if they live in a supportive environment, their ability to do the things they value will be little different from that of a younger person. If these added years are dominated by declines in physical and mental capacity, the implications for older people and for society are more negative.

Although some of the variations in older people’s health are genetic, most is due to people’s physical and social environments – including their homes, neighbourhoods, and communities, as well as their personal characteristics – such as their sex, ethnicity, or socioeconomic status. The environments that people live in as children – or even as developing fetuses – combined with their personal characteristics, have long-term effects on how they age.

Physical and social environments can affect health directly or through barriers or incentives that affect opportunities, decisions and health behaviour. Maintaining healthy behaviours throughout life, particularly eating a balanced diet, engaging in regular physical activity and refraining from tobacco use, all contribute to reducing the risk of non-communicable diseases, improving physical and mental capacity and delaying care dependency.

Supportive physical and social environments also enable people to do what is important to them, despite losses in capacity. The availability of safe and accessible public buildings and transport, and places that are easy to walk around, are examples of supportive environments. In developing a public-health response to ageing, it is important not just to consider individual and environmental approaches that ameliorate the losses associated with older age, but also those that may reinforce recovery, adaptation and psychosocial growth.

**Challenges in responding to population ageing**

There is no typical older person. Some 80-year-olds have physical and mental capacities similar to many 30-year-olds. Other people experience significant declines in capacities at much younger ages. A comprehensive public health response must address this wide range of older people’s experiences and needs.

The diversity seen in older age is not random. A large part arises from people’s physical and social environments and the impact of these environments on their opportunities and health behaviour. The relationship we have with our environments is skewed by personal characteristics such as the family we were born into, our sex and our ethnicity, leading to inequalities in health.

Older people are often assumed to be frail or dependent and a burden to society. Public health professionals, and society as a whole, need to address these and other ageist attitudes, which can lead to discrimination, affect the way policies are developed and the opportunities older people have to experience healthy aging.

Globalization, technological developments (e.g., in transport and communication), urbanization, migration and changing gender norms are influencing the lives of older people in direct and indirect ways. A public health response must take stock of these current and projected trends and frame policies accordingly.

**WHO response**

The United Nations (UN) General Assembly declared 2021–2030 the UN Decade of Healthy Ageing and asked WHO to lead the implementation. The UN Decade of Healthy Ageing is a global collaboration bringing together governments, civil society, international agencies, professionals, academia, the media and the private sector for 10 years of concerted, catalytic and collaborative action to foster longer and healthier lives.

The Decade builds on the WHO Global Strategy and Action Plan and the United Nations Madrid International Plan of Action on Ageing and supports the realization of the United Nations Agenda 2030 on Sustainable Development and the Sustainable Development Goals.

The UN Decade of Healthy Ageing (2021–2030) seeks to reduce health inequities and improve the lives of older people, their families and communities through collective action in four areas: changing how we think, feel and act towards age and ageism; developing communities in ways that foster the abilities of older people; delivering person-centred integrated care and primary health services responsive to older people; and providing older people who need it with access to quality long-term care.`
  },
  {
    slug: "the-rise-of-home-healthcare",
    title: "The Rise of Home Healthcare",
    snippet: "How personalized care at home is changing the medical landscape.",
    image: placeholderImages.find(p => p.id === 'blog-2'),
    content: `The paradigm of healthcare is shifting from hospital-centric models to patient-centric care, and home healthcare is at the forefront of this revolution. It offers a comfortable, convenient, and often more effective alternative for managing chronic illnesses, recovering from surgery, or receiving long-term care.
    
With advancements in technology, services that were once only available in a clinical setting can now be delivered at home. This includes remote monitoring, telehealth consultations, and skilled nursing care. The result is a more personalized experience that empowers patients and improves their quality of life.`
  },
  {
    slug: "a-guide-to-your-first-check-up",
    title: "A Guide to Your First Check-up",
    snippet: "What to expect and how to prepare for a routine medical visit.",
    image: placeholderImages.find(p => p.id === 'blog-3'),
    content: `A routine check-up is a cornerstone of preventive medicine. It's an opportunity to assess your overall health, catch potential issues early, and build a relationship with your healthcare provider. 
    
**Before your visit:**
- List any health concerns or questions you have.
- Make a note of all medications and supplements you take.
- Gather relevant family medical history.

**During your visit:** Expect a physical exam, a review of your lifestyle, and possibly some screening tests based on your age and risk factors. Be open and honest with your doctor to get the most out of your visit.`
  },
  {
    slug: "mental-health-matters",
    title: "Mental Health Matters",
    snippet: "Breaking the stigma and finding support for your mental well-being.",
    image: placeholderImages.find(p => p.id === 'blog-4'),
    content: `Mental health is an integral part of overall health, yet it is often surrounded by stigma and misunderstanding. It's okay not to be okay, and seeking help is a sign of strength, not weakness. 
    
Conditions like anxiety and depression are common and treatable. Therapy, medication, and lifestyle changes can make a profound difference. It's time to normalize conversations about mental health and create a supportive environment where everyone feels safe to seek the care they need.`
  },
  {
    slug: "healthy-eating-101",
    title: "Healthy Eating 101",
    snippet: "Simple dietary changes for a healthier, more energetic life.",
    image: placeholderImages.find(p => p.id === 'blog-5'),
    content: `Good nutrition is the foundation of good health. A balanced diet provides the energy you need to get through the day and the nutrients your body requires to function and repair itself.
    
**Key Principles:**
- Eat a rainbow: Incorporate a variety of colorful fruits and vegetables into your diet.
- Choose whole grains: Opt for brown rice, quinoa, and whole-wheat bread over refined grains.
- Lean protein: Include sources like fish, chicken, beans, and lentils.
- Healthy fats: Avocados, nuts, and olive oil are excellent sources.
- Limit processed foods and sugar: These can contribute to inflammation and chronic disease.`
  },
  {
    slug: "your-guide-to-pediatric-care",
    title: "Your Guide to Pediatric Care",
    snippet: "Ensuring your child gets the best start with preventative care.",
    image: placeholderImages.find(p => p.id === 'blog-6'),
    content: `**Introduction**
Paediatric care isn’t just about treating colds and fevers—it’s the ongoing support that helps children thrive from birth through adolescence. As a parent or caregiver, you’re navigating decisions about vaccinations, nutrition, sleep, development, safety, mental health, and when to see a paediatrician. This guide to paediatric health breaks those big topics into clear, trustworthy, and practical steps. We’ll cover what to expect at each stage, how to recognise common issues, and when to seek help. You’ll also find tips for at-home care, prevention strategies, and how to use digital tools to keep your child’s records organised. Whether you’re caring for a newborn, a toddler learning to talk, a school-age child building healthy habits, or a teen facing new challenges, this paediatric guide gives you the essentials—and the nuance—to make confident choices.

Note: If symptoms persist beyond two weeks, if your child has trouble breathing, severe pain, dehydration, or worsening symptoms, consult a doctor for further evaluation.

**Understanding Paediatric Care Across Childhood**
Paediatric care covers preventive, diagnostic, and therapeutic services for children from birth through adolescence. A paediatrician is trained to address age-specific needs—from feeding challenges in infants to mental health and school issues in teens—considering growth, development, and family context. Paediatric subspecialties include neonatology, cardiology, neurology, allergy/immunology, and adolescent medicine, among others.

Ages and stages matter. Babies and toddlers grow rapidly; regular well-child visits help track growth chart percentiles and developmental milestones. School-age children need immunisations, dental care, sleep hygiene, and injury prevention. Adolescents face unique issues like puberty, mood changes, social pressures, sports injuries, and digital well-being. Across all ages, paediatric care emphasises prevention and early detection—because small issues can quickly grow in children.

**What do well-child visits include?**
Typically: a physical exam; growth measurements (height/length, weight, head circumference in infants, BMI in older children); developmental screening; vision and hearing checks; vaccine updates; and anticipatory guidance (what to expect before the next visit). Many health systems follow schedules published by professional bodies adapted to local contexts.

If you’re unsure whether an issue needs immediate attention, use a simple triage rule: red (urgent), amber (soon), green (watchful waiting). Trouble breathing, blue lips, unresponsiveness, severe dehydration, or a rash with fever are red—seek urgent care. If symptoms persist beyond two weeks or your child’s condition doesn’t improve, consult a doctor for further evaluation.

**Growth and Development: Your Roadmap by Age**
Development happens across several domains: gross motor (rolling, walking), fine motor (grasping, drawing), language (babbling, words), cognitive (problem-solving), and social-emotional (smiling, sharing). While each child is unique, paediatric milestones by age offer signposts. For instance, many infants smile socially by 2 months, sit without support by 6–8 months, and take first steps around 12 months; toddlers may speak 2-word phrases by 24 months, and preschoolers can tell simple stories by 4 years. Use milestones as guides, not tests.

Red flags signal the need for evaluation and early intervention—for example: no smiling by 3 months, not babbling by 9 months, not walking by 18 months, loss of skills (regression), persistent lack of eye contact, or no single words by 16 months. Early identification matters; timely speech therapy, occupational therapy, or other supports can improve outcomes in conditions like autism or developmental language disorder. If you notice delays, don’t wait—book a visit, and bring a brief note of what you observe.

Growth tracking uses standardised charts to plot measurements across percentiles. A single percentile isn’t “good” or “bad”—what matters is the trend. A healthy trajectory follows an individual curve; sudden crossing of two percentile lines downwards can indicate nutritional or medical issues. Paediatric growth chart percentiles are tools for discussion—if in doubt, ask your paediatrician to explain the pattern and plan.

**Prevention First: Vaccines, Screenings, and Safety**
Vaccines are one of the most effective paediatric interventions—global immunisation prevents millions of deaths annually by protecting against diseases like measles, polio, and diphtheria. Paediatric vaccination schedules differ by country but commonly include: BCG, Hepatitis B, DTP, Hib, polio, pneumococcal, rotavirus, MMR, varicella, and annual influenza; HPV is recommended in preteens/teens to prevent cancers. Keep a digital and physical record; missing a dose typically means catch-up, not restarting.

Screenings detect issues early. Depending on age and risk: Newborns get hearing and metabolic screens. Infants and young children have vision and hearing checks, and screenings for lead, anaemia, and dental caries. Adolescents may be screened for mental health, scoliosis, and receive sexual health counselling. Consider vitamin D or iron tests if your child is at risk for deficiency (limited sunlight, restricted diet, heavy periods in teens).

Safety essentials reduce preventable injuries. For safe sleep, place babies on their back with no pillows/blankets in the crib. Use car seats correctly. Home-proof by securing furniture, using stair gates, and locking away medicines. For sun and sports, use sunscreen, helmets, and ensure heat safety.

**Common Paediatric Illnesses and What to Do**
Fever is a symptom, not a disease. For infants under 3 months with a temperature ≥38°C (100.4°F), seek urgent medical advice. For older children, focus on how the child looks and behaves: hydration, breathing, alertness. Use weight-based dosing of paracetamol or ibuprofen unless contraindicated; avoid aspirin in children. If the fever lasts more than 3 days, or your child looks very unwell, seek care promptly.

Coughs and colds are common and mostly viral. They resolve with fluids, rest, saline nose drops, and humidified air. Honey (for children over 1 year) can soothe a nighttime cough. Avoid over-the-counter cough/cold medicines in young children unless advised by a clinician.

Diarrhoea and vomiting increase the risk of dehydration. The cornerstone is oral rehydration solution (ORS)—small, frequent sips. Warning signs include dry mouth, no tears, decreased urination, and lethargy. If you see blood in the stool, persistent vomiting, or signs of dehydration, seek care.

Asthma, allergies, and eczema are common. Work with your clinician on an action plan to manage triggers and recognise early symptoms.

**Food, Sleep, and Movement: Building Healthy Habits**
Exclusive breastfeeding for about the first 6 months is recommended. If not possible, use iron-fortified infant formula. Introduce allergenic foods like peanut and egg around 6 months to reduce allergy risk.

Toddlers and school-age children thrive on routine. Offer balanced meals with fruits, vegetables, whole grains, and lean proteins. For picky eaters, caregivers decide what, when, and where food is served; children decide whether and how much to eat. Avoid sugary drinks.

Sleep is foundational. Toddlers need 11–14 hours, school-age kids 9–12, and teens 8–10. Consistent routines help. Avoid screens at least an hour before bed.

Aim for at least 60 minutes of daily physical activity for children and teens. For young children, free play and outdoor time are ideal.

**Mental and Behavioural Health in Children and Teens**
Mental health is health. Anxiety, low mood, and attention difficulties are common and treatable. Warning signs include persistent sadness, irritability, withdrawal, or sleep problems. For younger children, watch for excessive tantrums or regression.

ADHD signs can include inattention, hyperactivity, and impulsivity. Autism spectrum disorder often involves differences in social communication and restricted or repetitive behaviours. Early intervention is key for both.

Building resilience: Predictable routines, regular sleep, balanced nutrition, and daily outdoor time support emotional regulation. Teach coping skills like naming feelings and deep breathing. Stay connected with your child's school.

**Getting Care: When to See a Paediatrician and How to Choose**
Urgent red flags include difficulty breathing, severe dehydration, seizures, unresponsiveness, a stiff neck with fever, or a head injury with loss of consciousness. These require emergency evaluation.

Book a routine appointment for a persistent fever, recurrent wheezing, poor weight gain, delayed milestones, or chronic skin rashes.

**Conclusion**
Raising a healthy child is a journey with many small decisions—and you don’t have to make them alone. Paediatric care provides a structured, compassionate framework that adapts from infancy through adolescence. By focusing on prevention, watching development, and building a foundation of nutritious meals, steady sleep, active play, and emotional check-ins, you can help your child thrive. Keep records organised, use tele-paediatrics when convenient, and build a trusted relationship with your paediatrician. With informed choices and the right support, your child can thrive—today and into adulthood.`
  },
];
