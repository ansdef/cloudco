import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, image, link }: ServiceCardProps) => {
  return (
    <Link to={link}>
      <div className="relative h-48 rounded-3xl overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-accent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-overlay opacity-90"
        />
        <div className="relative z-10 h-full flex items-start p-6">
          <h3 className="text-xl font-semibold text-foreground leading-tight max-w-[70%]">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
