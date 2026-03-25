export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="p-5">
            <p className="text-sm text-muted-foreground text-center">&copy; {year} Next Wave XR. All rights reserved.</p>
            <p className="text-sm text-muted-foreground text-center">Developed by Justin Storm.</p>
        </footer>
    )
}