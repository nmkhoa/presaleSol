/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseMessageSignerWalletAdapter,
  WalletReadyState,
  type WalletName,
} from "@solana/wallet-adapter-base";
import { PublicKey } from "@solana/web3.js";

export class GlowWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = "Glow" as WalletName<string>;
  url = "https://glow.app";
  icon = "https://glow.app/favicon.png"; // hoặc URL icon phù hợp
  readyState: WalletReadyState = (window as any).glow
    ? WalletReadyState.Installed
    : WalletReadyState.NotDetected;

  private _connecting = false;
  private _publicKey: PublicKey | null = null;

  get connecting() {
    return this._connecting;
  }

  get supportedTransactionVersions(): ReadonlySet<"legacy"> | null {
    return new Set(["legacy"]);
  }

  get publicKey() {
    return this._publicKey;
  }

  get connected() {
    return !!this._publicKey;
  }

  async connect(): Promise<void> {
    if (this._connecting || this.connected) return;
    this._connecting = true;

    try {
      const provider = (window as any).glow?.solana;

      if (!provider) throw new Error("Glow provider not found");

      const res = await provider.connect();
      this._publicKey = new PublicKey(res.publicKey.toString());

      this.emit("connect", this._publicKey);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    const provider = (window as any).backpack?.solana;
    if (provider?.disconnect) await provider.disconnect();

    this._publicKey = null;
    this.emit("disconnect");
  }

  async signTransaction(tx: any): Promise<any> {
    const provider = (window as any).backpack?.solana;
    return await provider.signTransaction(tx);
  }

  async signAllTransactions(txs: any[]): Promise<any[]> {
    const provider = (window as any).backpack?.solana;
    return await provider.signAllTransactions(txs);
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    const provider = (window as any).backpack?.solana;
    const { signature } = await provider.signMessage(message, "utf8");
    return signature;
  }
}
