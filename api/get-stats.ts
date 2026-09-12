/**
 * Vercel Serverless Function - STATISTIQUES NATURE CLEAN
 *
 * Retourne des statistiques de devis (mock data pour le moment).
 * A connecter a une base de donnees (Supabase, Firebase, etc.)
 * pour les vraies statistiques en production.
 *
 * Endpoint: /api/get-stats
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseCookies, verifySessionToken, COOKIE_NAME } from './_utils/auth';

/**
 * Genere des statistiques mock pour le dashboard admin.
 * En production, remplacer par une requete vers votre BDD.
 */
function generateMockStats() {
  return {
    total: 47,
    today: 3,
    thisWeek: 12,
    thisMonth: 28,
    byService: {
      'bureaux': 14,
      'coproprietes': 10,
      'fin-chantier': 8,
      'particuliers': 15,
    },
    bySource: {
      'Google': 22,
      'Direct': 10,
      'Facebook': 8,
      'Recommandation': 7,
    },
    byCity: {
      '13001': 8,
      '13002': 5,
      '13006': 7,
      '13008': 12,
      '13010': 6,
      '13100': 9,
    },
    // SEC-013 : Données clairement fictives (jamais de PII réalistes en mock)
    recentSubmissions: [
      {
        id: 1,
        nom: 'TEST_CLIENT_A',
        prenom: 'Prénom-Test',
        email: 'test-a@example.test',
        telephone: '06 00 00 00 01',
        service: 'bureaux',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        nom: 'TEST_CLIENT_B',
        prenom: 'Prénom-Test',
        email: 'test-b@example.test',
        telephone: '06 00 00 00 02',
        service: 'coproprietes',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        nom: 'TEST_CLIENT_C',
        prenom: 'Prénom-Test',
        email: 'test-c@example.test',
        telephone: '06 00 00 00 03',
        service: 'fin-chantier',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // SEC-007 : Authentification obligatoire — cookie HttpOnly OU Bearer token
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies[COOKIE_NAME];
  const bearerToken = (req.headers.authorization || '').replace('Bearer ', '');
  const token = cookieToken || bearerToken;

  if (!verifySessionToken(token)) {
    return res.status(401).json({ error: 'Non autorisé. Session invalide ou expirée.' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const stats = generateMockStats();

    return res.status(200).json({
      success: true,
      stats,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur generation stats:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}