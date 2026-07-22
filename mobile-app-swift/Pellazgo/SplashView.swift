import SwiftUI

struct SplashView: View {
    @State private var isActive = false
    @State private var opacity = 0.0
    @State private var scale = 0.82

    var body: some View {
        if isActive {
            ContentView()
        } else {
            ZStack {
                Color(red: 15/255, green: 35/255, blue: 24/255)
                    .ignoresSafeArea()

                VStack(spacing: 18) {
                    Image("AppLogo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 120, height: 120)
                        .clipShape(RoundedRectangle(cornerRadius: 26, style: .continuous))
                        .shadow(color: .black.opacity(0.35), radius: 18, x: 0, y: 8)

                    Text("Pellazgo")
                        .font(.custom("Georgia", size: 28))
                        .fontWeight(.semibold)
                        .foregroundColor(Color(red: 212/255, green: 175/255, blue: 55/255))
                        .tracking(2)
                }
                .scaleEffect(scale)
                .opacity(opacity)
                .onAppear {
                    withAnimation(.easeOut(duration: 0.55)) {
                        opacity = 1.0
                        scale  = 1.0
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2.2) {
                        withAnimation(.easeIn(duration: 0.3)) { opacity = 0 }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                            isActive = true
                        }
                    }
                }
            }
        }
    }
}
