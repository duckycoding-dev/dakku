import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shadcn/components/ui/button';
export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <h3>Welcome Home!</h3>
      <Button>Click me</Button>
    </div>
  );
}
