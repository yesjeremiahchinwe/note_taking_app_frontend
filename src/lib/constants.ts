import { useLocation } from "react-router-dom"
import { MobileNavLink } from "./types"
import { IconArchive, IconHome, IconSearch, IconSettings, IconTag } from "./icons"

export const tags: string[] = ['Cooking', 'Dev', 'Fitness', 'Health', 'Personal', 'React', 'Recipes', 'Shopping', 'Travel', 'TypeScript']

// export const notes: Note[] = [
//     {
//         title: "React Performance Optimization",
//         tags: "Dev", "React",
//         content: "Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks",
//         lastEdited: "2024-10-29T10:15:00Z",
//         isArchived: false
//     },
//     {
//         title: "Japan Travel Planning",
//         tags: "Travel", "Personal",
//         content: "Japan Trip Planning - Spring 2025\n\nItinerary Draft:\nWeek 1: Tokyo\n- Shibuya and Harajuku\n- TeamLab Digital Art Museum\n- Day trip to Mount Fuji\n\nWeek 2: Kyoto & Osaka\n- Traditional temples\n- Cherry blossom viewing\n- Food tour in Osaka\n\nBudget: $3000\nAccommodation: Mix of hotels and traditional ryokans\nJR Pass: 14 days\n\nTODO: Book flights 6 months in advance",
//         lastEdited: "2024-10-28T16:45:00Z",
//         isArchived: false
//     },
//     {
//         title: "Favorite Pasta Recipes",
//         tags: "Cooking", "Recipes",
//         content: "Classic Italian Recipes:\n\n1. Carbonara\n- Eggs, pecorino, guanciale\n- No cream ever!\n- Save pasta water\n\n2. Cacio e Pepe\n- Pecorino Romano\n- Fresh black pepper\n- Technique is crucial\n\n3. Arrabbiata\n- San Marzano tomatoes\n- Fresh garlic\n- Red pepper flakes\n\nNote: Always use high-quality ingredients",
//         lastEdited: "2024-10-27T14:30:00Z",
//         isArchived: false
//     },
//     {
//         title: "TypeScript Migration Guide",
//         tags: "Dev", "React", "TypeScript",
//         content: "Project migration steps:\n\n1. Initial Setup\n- Install TypeScript dependencies\n- Configure tsconfig.json\n- Set up build pipeline\n\n2. Migration Strategy\n- Start with newer modules\n- Add type definitions gradually\n- Use 'any' temporarily for complex cases\n\n3. Testing Approach\n- Update test configuration\n- Add type testing\n- Validate build process\n\nDeadline: End of Q4 2024",
//         lastEdited: "2024-10-26T09:20:00Z",
//         isArchived: true
//     },
//     {
//         title: "Weekly Workout Plan",
//         tags: "Fitness", "Health",
//         content: "Monday: Upper Body\n- Bench Press 4x8\n- Rows 4x10\n- Shoulder Press 3x12\n- Pull-ups 3 sets\n\nWednesday: Lower Body\n- Squats 4x8\n- Romanian Deadlifts 3x10\n- Lunges 3x12 each\n- Calf Raises 4x15\n\nFriday: Full Body\n- Deadlifts 3x5\n- Push-ups 3x12\n- Leg Press 3x12\n- Core Work\n\nCardio: Tuesday/Thursday - 30 min run",
//         lastEdited: "2024-10-25T18:10:00Z",
//         isArchived: false
//     },
//     {
//         title: "Gift Ideas",
//         tags: "Personal", "Shopping",
//         content: "Birthday and Holiday Gift List:\n\nMom:\n- Cooking class subscription\n- Kindle Paperwhite\n- Spa day package\n\nDad:\n- Golf lessons\n- Wireless earbuds\n- BBQ accessories\n\nSister:\n- Art supplies set\n- Yoga mat kit\n- Coffee subscription\n\nBudget per person: $150-200",
//         lastEdited: "2024-10-20T11:30:15Z",
//         isArchived: true
//     },
//     {
//         title: "React Component Library",
//         tags: "Dev", "React",
//         content: "Custom Component Library Structure:\n\n1. Basic Components\n- Button\n- Input\n- Card\n- Modal\n\n2. Form Components\n- FormField\n- Select\n- Checkbox\n- RadioGroup\n\n3. Layout Components\n- Container\n- Grid\n- Flex\n\nAll components need:\n- TypeScript definitions\n- Unit tests\n- Storybook documentation\n- Accessibility support",
//         lastEdited: "2024-10-15T14:23:45Z",
//         isArchived: true
//     },
//     {
//         title: "Meal Prep Ideas",
//         tags: "Cooking", "Health", "Recipes",
//         content: "Weekly Meal Prep Plan:\n\nBreakfast Options:\n- Overnight oats\n- Egg muffins\n- Smoothie packs\n\nLunch Containers:\n- Greek chicken bowl\n- Buddha bowls\n- Tuna pasta salad\n\nSnacks:\n- Cut vegetables\n- Mixed nuts\n- Greek yogurt parfait\n\nPrep Time: Sunday 2-4pm\nStorage: Glass containers\nLasts: 4-5 days",
//         lastEdited: "2024-10-12T09:45:15Z",
//         isArchived: false
//     },
//     {
//         title: "Reading List",
//         tags: "Personal", "Dev",
//         content: "Current Reading Queue:\n\n1. Technical Books\n- Clean Architecture by Robert Martin\n- Designing Data-Intensive Applications\n- TypeScript Design Patterns\n\n2. Personal Development\n- Deep Work by Cal Newport\n- Atomic Habits\n- The Psychology of Money\n\nCurrently Reading: Clean Architecture\nNext Up: Deep Work\n\nGoal: One book per month",
//         lastEdited: "2024-10-05T12:20:30Z",
//         isArchived: false
//     },
//     {
//         title: "Fitness Goals 2025",
//         tags: "Fitness", "Health", "Personal",
//         content: "2025 Fitness Objectives:\n\n1. Strength Goals\n- Bench press: 225 lbs\n- Squat: 315 lbs\n- Deadlift: 405 lbs\n\n2. Cardio Goals\n- Run half marathon\n- 5k under 25 minutes\n\n3. Habits\n- Gym 4x per week\n- Daily 10k steps\n- Sleep 7+ hours\n\nTrack all workouts in Strong app",
//         lastEdited: "2024-09-22T07:30:00Z",
//         isArchived: false
//     }
// ]

export const MobileNavLinks = () => {
    const location = useLocation()

    const mobileLinks: MobileNavLink[] = [
        {
            text: 'Home',
            path: '/',
            isActive: location.pathname === "/",
            Icon: IconHome
        },
        {
            text: 'Search',
            path: '/search',
            isActive: location.pathname === "/search",
            Icon: IconSearch
        },
        {
            text: 'Archived',
            path: '/archived',
            isActive: location.pathname === "/archived",
            Icon: IconArchive
        },
        {
            text: 'Tags',
            path: '/tags',
            isActive: location.pathname === "/tags",
            Icon: IconTag
        },
        {
            text: 'Settings',
            path: '/settings',
            isActive: location.pathname === "/settings",
            Icon: IconSettings
        },
    ]

    return mobileLinks
}