import React from "react";

const Hero = () => {
  return (
    <div
      className="relative flex flex-col justify-center px-10 text-white
        bg-gradient-to-br from-indigo-600 to-black"
    >

      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-lg"></div>  {/*  logo */}
          <div>
            <h2 className="text-xl font-semibold">CoopGest</h2>
            <p className="text-sm text-white/70">
              Système de Gestion Coopérative
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold leading-snug mb-4">
          Gérez votre coopérative <br /> en toute simplicité
        </h1>

        <p className="text-white/80 mb-6">
          Une plateforme complète pour la gestion des membres, produits,
          réunions et finances de votre coopérative.
        </p>

        <div className="space-y-3">
          <div className="bg-white/10 p-3 rounded-lg">
            <h4 className="font-semibold">Gestion des Membres</h4>
            <p className="text-sm text-white/70">Suivi complet des adhérents</p>
          </div>

          <div className="bg-white/10 p-3 rounded-lg">
            <h4 className="font-semibold">Suivi Financier</h4>
            <p className="text-sm text-white/70">
              Pertes, profits et investissements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
0;
export default Hero;
