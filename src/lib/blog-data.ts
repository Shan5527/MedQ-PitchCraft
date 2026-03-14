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
    content: `As we age, maintaining a healthy lifestyle becomes more important than ever. Senior health is not just about managing chronic conditions, but also about promoting vitality, mental sharpness, and emotional well-being. Regular exercise, a balanced diet, and consistent social engagement are the pillars of a healthy senior life.
    
**Nutrition:** Focus on nutrient-dense foods like fruits, vegetables, lean proteins, and whole grains. Hydration is also crucial, as the sense of thirst can diminish with age.
    
**Exercise:** Gentle activities like walking, swimming, or yoga can improve mobility, balance, and cardiovascular health. Strength training is also vital for maintaining muscle mass and bone density.
    
**Mental & Social Health:** Stay connected with loved ones, pursue hobbies, and challenge your mind with puzzles or new skills. A strong social network is a powerful buffer against loneliness and depression.`
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
    content: `Pediatric care is dedicated to the health and well-being of children from birth through adolescence. Regular well-child visits are essential for monitoring growth and development, administering vaccinations, and addressing any concerns you may have.
    
A good pediatrician acts as a partner in your child's health journey. They provide guidance on everything from nutrition and safety to behavior and developmental milestones. Building a trusting relationship with your pediatrician is key to ensuring your child receives the best possible care.`
  },
];
