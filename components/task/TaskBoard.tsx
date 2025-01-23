
import TaskCard from "./TaskCard";

export default function TaskBoard() {
    const statuses = ['backlog', 'pending', 'running', 'completed', 'on_hold', 'canceled', 'failed', 'review'];
    const cards = Array.from({ length: 10 }, (_, i) => i + 1); // Generate an array of 10 items
  
    return (
      
        <div  className="flex overflow-x-scroll overflow-y-hidden space-x-4 p-4">
          {statuses.map((status) => (
            <div key={status} className="min-w-[300px] max-h-[450px] bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-center p-3 capitalize">{status}</h2>
              <div className="p-2 space-y-3 max-h-[450px] overflow-y-auto">
                {/* Map over 10 cards */}
                {cards.map((card) => (
                  <TaskCard key={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      
    );
  }
  