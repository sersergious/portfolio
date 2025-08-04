// components/research/PlaceholderAwards.tsx
import {Award} from "lucide-react";

export function PlaceholderAwards() {
    return (
        <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
            <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">Awards & Recognition</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                    Featured publications and award-winning research will be highlighted here.
                </p>
            </div>
        </div>
    )
}