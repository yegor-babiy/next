import { prisma } from "@/lib/prisma";
import { passwordResetPath } from "@/paths";
import { generateRandomSessionToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";

const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 2;

export const generatePasswordResetLink = async (userId: string) => {
  await prisma.passwordResetToken.deleteMany({
    where: { userId }
  });
  const tokenId = generateRandomSessionToken();
  const tokenHash = hashToken(tokenId);

  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS)
    }
  });

  const passwordResetLink = getBaseUrl() + passwordResetPath(tokenId);
  return passwordResetLink;
};
