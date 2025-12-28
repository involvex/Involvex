/**
 * TypeScript-Beispiel: reCAPTCHA Enterprise Token prüfen
 * Voraussetzung: npm install @google-cloud/recaptcha-enterprise
 */

import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

// Client erstellen
const client = new RecaptchaEnterpriseServiceClient()

/**
 * Prüft ein reCAPTCHA-Token mit Google Cloud reCAPTCHA Enterprise
 * @param projectID - GCP-Projekt-ID
 * @param siteKey - reCAPTCHA Site Key
 * @param token - Token vom Client
 * @param expectedAction - Erwartete Aktion (z. B. "login")
 * @returns true, wenn Mensch, sonst false
 */
export default async function assessRecaptcha(
  projectID: string,
  siteKey: string,
  token: string,
  expectedAction: string,
): Promise<boolean> {
  try {
    const request = {
      parent: `projects/${projectID}`,
      assessment: {
        event: {
          token,
          siteKey,
        },
      },
    }

    const [response] = await client.createAssessment(request)

    // Token-Validität prüfen
    if (!response.tokenProperties?.valid) {
      console.error(`Ungültiges Token: ${response.tokenProperties?.invalidReason}`)
      return false
    }

    // Aktion prüfen
    if (response.tokenProperties.action !== expectedAction) {
      console.error(`Unerwartete Aktion: ${response.tokenProperties.action}`)
      return false
    }

    // Score auswerten (0.0 = Bot, 1.0 = Mensch)
    const score = response.riskAnalysis?.score ?? 0
    console.log(`Score: ${score}`)
    console.log(`Gründe: ${response.riskAnalysis?.reasons?.join(', ')}`)

    return score >= 0.5 // Schwellenwert anpassen
  } catch (error) {
    console.error('Fehler bei reCAPTCHA-Prüfung:', error)
    return false
  }
}

// Beispielaufruf
;(async () => {
  const projectID = import.meta.env.VITE_RECAPTCHA_PROJECTID
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITEKEY
  const token = import.meta.env.VITE_RECAPTCHA_TOKEN
  const expectedAction = 'login'

  const isHuman = await assessRecaptcha(projectID, siteKey, token, expectedAction)
  console.log(`Ist Mensch: ${isHuman}`)
})()
