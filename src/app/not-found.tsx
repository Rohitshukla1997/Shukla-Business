import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-[#FFFFFF]">
      <Container size="narrow" className="text-center space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#000000] text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#000000]">
          Page not found.
        </h1>
        <p className="text-base text-[#171717] max-w-md mx-auto leading-relaxed">
          The requested page could not be located. It might have been moved or the URL might be mistyped.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button href="/" variant="primary">
            Return to Home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}
